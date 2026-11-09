/**
 * Smart Notes (智能便签) — host half.
 *
 * The browser module owns the UI and the parser; this half owns the two things
 * the page cannot do on its own:
 *
 *  1. **Reminders that survive being backgrounded.** A webview timer is
 *     throttled (or frozen) once the app leaves the foreground, so a reminder
 *     scheduled with setTimeout can fire hours late or not at all. The host
 *     process keeps ticking, so the schedule lives here instead.
 *  2. **The notification itself.** `POST /notify` on the device bridge is the
 *     only notification surface this app exposes; it needs no permission of its
 *     own and shows the plugin's own title in the shade.
 *
 * The bridge exposes no audio endpoint (only /notify and /say exist — /alarm,
 * /sound, /beep and friends all answer "unknown route"), and `cmd notification`
 * / SET_ALARM are blocked by the platform's uid check, so the *sound* stays on
 * the client side where WebAudio is available. Notification here, alarm tone
 * there; both land at the same moment when the page is open.
 *
 * Schedule flow:
 *   client (any change) --POST--> /api/dsh-smart-notes/reminders
 *                                  -> <DSH_HOME>/storages/dsh-smart-notes/reminders.json
 *   host tick (every 20s) -> due? -> bridge /notify -> mark fired
 *
 * Fired marks are kept per `id@due` so editing a note re-arms it, and they are
 * pruned to the most recent few hundred entries to keep the file small.
 */

import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const name = 'dsh-smart-notes';

/** `webServer` is optional (headless hosts have none); `timer` is required. */
export const inject = ['timer', 'webServer'];

const ROUTE = '/api/dsh-smart-notes/reminders';
const TICK_MS = 20 * 1000;
/** A reminder missed by more than this is marked fired silently, not announced. */
const GRACE_MS = 15 * 60 * 1000;
/** Date-only notes (no clock time) are announced at this local hour. */
const DAY_DUE_HOUR = 8;
const NOTIFY_TITLE = '智能便签';

function dshHome() {
  return process.env.DSH_HOME || process.env.HOME || '.';
}

function storeFile() {
  return join(dshHome(), 'storages', 'dsh-smart-notes', 'reminders.json');
}

function readStore() {
  try {
    const raw = readFileSync(storeFile(), 'utf8');
    const data = JSON.parse(raw);
    return {
      items: Array.isArray(data?.items) ? data.items : [],
      fired: data && typeof data.fired === 'object' && data.fired ? data.fired : {},
      updatedAt: Number(data?.updatedAt) || 0,
    };
  } catch {
    return { items: [], fired: {}, updatedAt: 0 };
  }
}

function writeStore(data) {
  const file = storeFile();
  const dir = join(file, '..');
  mkdirSync(dir, { recursive: true });
  const tmp = `${file}.tmp`;
  // Android/SELinux: write a temp file and rename — an in-place truncate can
  // leave a half-written schedule behind if the process dies mid-write.
  writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  renameSync(tmp, file);
}

/** Minutes since local midnight for a `HH:MM` string, or null. */
function clockMinutes(value) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(value || '').trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

/** Local midnight of a `YYYY-MM-DD` string, or null. */
function parseDay(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || '').slice(0, 10));
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 0, 0, 0, 0);
}

function atClock(day, minutes) {
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), Math.floor(minutes / 60), minutes % 60, 0, 0);
}

function addDays(day, amount) {
  const next = new Date(day.getTime());
  next.setDate(next.getDate() + amount);
  return next;
}

function startOfDay(value) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0, 0);
}

/**
 * The next instant this note should be announced, or null when it has no usable
 * time. Repeats roll forward from `now` so a daily note stays a daily note
 * without the client rewriting it every morning.
 */
export function nextFireAt(item, now) {
  if (!item || item.status === 'completed') return null;
  const due = String(item.due || '');
  const repeat = String(item.repeat || '');
  const minutes = clockMinutes(due.length > 10 ? due.slice(11, 16) : '');
  const day = parseDay(due);

  if (!repeat) {
    if (!day) return null;
    if (minutes === null) return atClock(day, DAY_DUE_HOUR * 60);
    return atClock(day, minutes);
  }

  if (!day) return null;
  const clock = minutes === null ? DAY_DUE_HOUR * 60 : minutes;
  const today = startOfDay(now);

  if (repeat === 'daily') {
    let candidate = atClock(today, clock);
    if (candidate.getTime() <= now.getTime()) candidate = atClock(addDays(today, 1), clock);
    return candidate;
  }
  if (repeat === 'weekday') {
    for (let step = 0; step < 8; step += 1) {
      const candidate = atClock(addDays(today, step), clock);
      const weekday = candidate.getDay();
      if (weekday === 0 || weekday === 6) continue;
      if (candidate.getTime() <= now.getTime()) continue;
      return candidate;
    }
    return null;
  }
  const weekly = /^weekly:(\d)$/.exec(repeat);
  if (weekly) {
    const target = Number(weekly[1]) % 7;
    for (let step = 0; step < 8; step += 1) {
      const candidate = atClock(addDays(today, step), clock);
      if (candidate.getDay() !== target) continue;
      if (candidate.getTime() <= now.getTime()) continue;
      return candidate;
    }
    return null;
  }
  const monthly = /^monthly:(\d{1,2})$/.exec(repeat);
  if (monthly) {
    const target = Number(monthly[1]);
    for (let step = 0; step < 13; step += 1) {
      const monthStart = new Date(today.getFullYear(), today.getMonth() + step, 1);
      const lastDay = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
      const candidate = atClock(new Date(monthStart.getFullYear(), monthStart.getMonth(), Math.min(target, lastDay)), clock);
      if (candidate.getTime() <= now.getTime()) continue;
      return candidate;
    }
    return null;
  }
  return atClock(day, clock);
}

function fireKey(item) {
  return `${item.id}@${item.due || ''}@${item.repeat || ''}`;
}

async function pushNotification(body) {
  const token = process.env.DSH_BRIDGE_TOKEN || '';
  try {
    const response = await fetch('http://127.0.0.1:3083/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-DSH-Token': token },
      body: JSON.stringify({ title: NOTIFY_TITLE, body }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function apply(ctx) {
  const webServer = typeof ctx.reflect?.get === 'function' ? ctx.reflect.get('webServer') : ctx.webServer;

  if (webServer) {
    ctx.effect(() => webServer.register({
      kind: 'exact',
      path: ROUTE,
      handler(req, res) {
        const send = (status, payload) => {
          res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify(payload));
        };
        if (req.method === 'GET') {
          const data = readStore();
          send(200, { ok: true, count: data.items.length, updatedAt: data.updatedAt });
          return;
        }
        if (req.method !== 'POST') {
          send(405, { ok: false, error: 'method-not-allowed' });
          return;
        }
        let raw = '';
        req.on('data', (chunk) => {
          raw += chunk;
          if (raw.length > 512 * 1024) req.destroy();
        });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(raw || '{}');
            const items = Array.isArray(parsed.items) ? parsed.items.filter((item) => item && item.id) : [];
            const previous = readStore();
            const keep = {};
            // Drop fired marks for notes that are gone, so the file does not grow
            // forever after a user deletes their notes.
            const present = new Set(items.map((item) => String(item.id)));
            for (const [key, value] of Object.entries(previous.fired || {})) {
              if (present.has(key.split('@')[0])) keep[key] = value;
            }
            writeStore({ items, fired: keep, updatedAt: Date.now() });
            send(200, { ok: true, count: items.length });
          } catch (error) {
            send(400, { ok: false, error: 'bad-json', detail: String(error?.message || error) });
          }
        });
      },
    }), 'smart-notes:reminder-route');
  }

  const tick = async () => {
    const data = readStore();
    if (!data.items.length) return;
    const now = new Date();
    let changed = false;
    for (const item of data.items) {
      if (item.status === 'completed') continue;
      const when = nextFireAt(item, now);
      if (!when) continue;
      const key = fireKey(item);
      const already = Number(data.fired[key]) || 0;
      if (already) continue;
      const delta = now.getTime() - when.getTime();
      if (delta < 0) continue;
      data.fired[key] = now.getTime();
      changed = true;
      // Missed by more than the grace window (device asleep, engine restarted
      // after lunch): record it as fired but do not buzz the user about a
      // morning meeting in the evening.
      if (delta > GRACE_MS) continue;
      const clock = item.due && item.due.length > 10 ? item.due.slice(11, 16) : '';
      const where = item.location ? ` · ${item.location}` : '';
      const body = clock ? `${clock} ${item.title}${where}` : `今天 ${item.title}${where}`;
      await pushNotification(body);
    }
    if (changed) {
      const entries = Object.entries(data.fired).sort((a, b) => b[1] - a[1]).slice(0, 400);
      writeStore({ items: data.items, fired: Object.fromEntries(entries), updatedAt: data.updatedAt });
    }
  };

  ctx.interval(() => {
    tick().catch((error) => ctx.logger?.warn?.(`[smart-notes] reminder tick failed: ${error?.message || error}`));
  }, TICK_MS);

  ctx.logger?.info?.('[smart-notes] host ready (reminders every 20s, notify on due)');
}
