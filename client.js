window.__ModuleLoader__.load({
  id: 'dsh-smart-notes',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const PANEL_ID = 'smart-notes';
    const TODOS_KEY = 'dsh.my-todos.v1';
    const LEGACY_KEY = 'dsh.sticky-notes-wall.v1';
    const NOTE_COLORS = ['sun', 'rose', 'peach', 'apricot', 'lemon', 'sage', 'mint', 'aqua', 'sky', 'periwinkle', 'lilac', 'lavender'];
    const COLOR_ALIASES = { yellow: 'sun', gold: 'sun', pink: 'rose', red: 'rose', orange: 'apricot', green: 'mint', teal: 'aqua', blue: 'sky', purple: 'lilac' };
    const listeners = new Set();

    const COPY = {
      en: {
        nav: 'Smart Notes', title: 'Smart Notes', subtitle: 'Say it once — time, place and repeat are filled in for you.',
        pendingCount: '{count} pending', search: 'Search notes', all: 'All', pending: 'Pending', completed: 'Done',
        unscheduled: 'Unscheduled', today: 'Today', tomorrow: 'Tomorrow', yesterday: 'Yesterday', dayAfter: 'In 2 days',
        emptyTitle: 'Nothing pinned yet', emptyBody: 'Tap + and just say it in one sentence.',
        noResultsTitle: 'No matching notes', noResultsBody: 'Try another keyword, status, or time range.',
        addTitle: 'New note', editTitle: 'Edit note',
        smartLabel: 'Say it in one sentence', smartPlaceholder: 'e.g. “tomorrow 3pm meeting with Liu at the office”',
        smartHint: 'Time and place are picked up automatically', smartVoice: 'Speak',
        recognized: 'Detected', undetected: 'No time detected', noPlace: 'No place',
        chipTime: 'Time', chipPlace: 'Place', clearField: 'Clear',
        tasksFound: '{count} tasks found', expandAll: 'Use all',
        moreOptions: 'More options', fewerOptions: 'Hide options',
        titleLabel: 'Title', titlePlaceholder: 'What needs to be done?', location: 'Location', locationPlaceholder: 'Where?',
        color: 'Note colour', time: 'When', pickTime: 'Pick a date & time', allDay: 'All day', setTime: 'Set time',
        noTimeLabel: 'No time set', optional: 'Optional', create: 'Pin note',
        startTime: 'Start', endTime: 'End', noEnd: 'No end time', endBeforeStart: 'End must be after start',
        repeat: 'Repeat', repeatNone: 'Once', repeatDaily: 'Daily', repeatWeekday: 'Weekdays', repeatWeekly: 'Weekly', repeatMonthly: 'Monthly',
        repeatChip: '{label} repeat', rangeJoiner: '–', save: 'Save', cancel: 'Cancel', remove: 'Delete', confirmRemove: 'Tap again', markCompleted: 'Mark done', markPending: 'Mark pending',
        close: 'Close', overdue: 'Overdue', needTitle: 'Write something first',
        quick: 'Quick', todayQ: 'Today', tomorrowQ: 'Tomorrow', dayAfterQ: 'In 2 days', weekendQ: 'Weekend', nextMondayQ: 'Next Mon',
        hour: 'Hour', minute: 'Minute', morning: '9:00', noon: '12:00', afternoon: '15:00', evening: '20:00',
        clearTime: 'No time', done: 'Done', monthPrev: 'Previous month', monthNext: 'Next month',
        weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        toastAdded: 'Note pinned', toastUpdated: 'Note updated', toastDeleted: 'Note deleted', toastDone: 'Nice — one less', toastBack: 'Back to pending',
        timeFilter: 'Time range', anyTime: 'Any time', todayOnly: 'Today', nextSevenDays: 'Next 7 days', thisWeek: 'This week', thisMonth: 'This month', overdueOnly: 'Overdue',
        customRange: 'Custom range', startDate: 'Start', endDate: 'End', applyRange: 'Apply', clearRange: 'Clear',
        invalidRange: 'Start must not be after end.', fromDate: 'From {date}', throughDate: 'Through {date}',
        sound: 'sound',
      },
      zh: {
        nav: '智能便签', title: '智能便签', subtitle: '说一句话就建好，时间、地点、重复自动填。',
        pendingCount: '{count} 项待完成', search: '搜索便签', all: '全部', pending: '待完成', completed: '已完成',
        unscheduled: '未安排', today: '今天', tomorrow: '明天', yesterday: '昨天', dayAfter: '后天',
        emptyTitle: '还没有便签', emptyBody: '点右下角 +，一句话就能贴上第一张。',
        noResultsTitle: '没有匹配的便签', noResultsBody: '换个关键词、状态或时间范围试试。',
        addTitle: '新增待办', editTitle: '编辑待办',
        smartLabel: '一句话就能建', smartPlaceholder: '例如：明天下午三点 和小刘老师开会 在办公室',
        smartHint: '自动识别时间与地点，也能用「、」一次说几件事', smartVoice: '语音',
        recognized: '已识别', undetected: '没识别到时间', noPlace: '没写地点',
        chipTime: '时间', chipPlace: '地点', clearField: '清除',
        tasksFound: '识别到 {count} 件事', expandAll: '全部创建',
        moreOptions: '更多选项', fewerOptions: '收起选项',
        titleLabel: '标题', titlePlaceholder: '接下来要完成什么？', location: '地点', locationPlaceholder: '这件事在哪里进行？',
        color: '便签颜色', time: '时间', pickTime: '选择日期与时间', allDay: '全天', setTime: '设置时刻',
        noTimeLabel: '未设时间', optional: '可选', create: '贴上便签',
        startTime: '开始', endTime: '结束', noEnd: '不设结束时间', endBeforeStart: '结束时间要晚于开始时间',
        repeat: '重复', repeatNone: '不重复', repeatDaily: '每天', repeatWeekday: '工作日', repeatWeekly: '每周', repeatMonthly: '每月',
        repeatChip: '每{label}', rangeJoiner: '–', save: '保存修改', cancel: '取消', remove: '删除', confirmRemove: '再点一次删除', markCompleted: '标记完成', markPending: '恢复待完成',
        close: '关闭', overdue: '已逾期', needTitle: '先写一句要做什么',
        quick: '快捷', todayQ: '今天', tomorrowQ: '明天', dayAfterQ: '后天', weekendQ: '周末', nextMondayQ: '下周一',
        hour: '时', minute: '分', morning: '9:00', noon: '12:00', afternoon: '15:00', evening: '20:00',
        clearTime: '不设时间', done: '完成', monthPrev: '上个月', monthNext: '下个月',
        weekdays: ['一', '二', '三', '四', '五', '六', '日'],
        monthNames: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
        toastAdded: '便签已贴上', toastUpdated: '已保存修改', toastDeleted: '已删除', toastDone: '又完成一件', toastBack: '已恢复为待完成',
        timeFilter: '时间范围', anyTime: '全部时间', todayOnly: '今天', nextSevenDays: '未来 7 天', thisWeek: '本周', thisMonth: '本月', overdueOnly: '已逾期',
        customRange: '自定义范围', startDate: '开始', endDate: '结束', applyRange: '应用', clearRange: '清除',
        invalidRange: '开始日期不能晚于结束日期。', fromDate: '从 {date}', throughDate: '截至 {date}',
        sound: '声',
      },
    };

    function copyFor(locale) {
      return String(locale || '').toLowerCase().startsWith('zh') ? COPY.zh : COPY.en;
    }

    function isZh(locale) {
      return String(locale || '').toLowerCase().startsWith('zh');
    }

    function useCopy(runtime) {
      const [, setRevision] = React.useState(0);
      React.useEffect(() => runtime.locale.subscribe(() => setRevision((value) => value + 1)), [runtime]);
      return copyFor(runtime.locale.getSnapshot().active);
    }

    /* ---------------- store ---------------- */

    function todoId() {
      return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    }

    function colorFromId(id) {
      let hash = 0;
      const text = String(id || 'todo');
      for (let index = 0; index < text.length; index += 1) hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
      return NOTE_COLORS[Math.abs(hash) % NOTE_COLORS.length];
    }

    function normalizeColor(value, id) {
      if (NOTE_COLORS.includes(value)) return value;
      if (typeof value === 'string' && COLOR_ALIASES[value.toLowerCase()]) return COLOR_ALIASES[value.toLowerCase()];
      return colorFromId(id);
    }

    const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
    const DATE_TIME = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/;

    function normalizeDue(value) {
      if (typeof value !== 'string' || !value) return '';
      if (DATE_ONLY.test(value)) {
        const date = new Date(`${value}T00:00:00`);
        if (Number.isNaN(date.getTime())) return '';
        return localDateKey(date) === value ? value : '';
      }
      const match = DATE_TIME.exec(value);
      if (!match) return '';
      const parts = match.slice(1).map((part) => Number(part || 0));
      const date = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
      if (date.getFullYear() !== parts[0] || date.getMonth() !== parts[1] - 1 || date.getDate() !== parts[2] || date.getHours() !== parts[3] || date.getMinutes() !== parts[4]) return '';
      return value;
    }

    const TIME_ONLY = /^([01]\d|2[0-3]):[0-5]\d$/;
    const REPEATS = ['daily', 'weekday', 'weekly', 'monthly'];

    function normalizeEnd(value) {
      if (typeof value !== 'string') return '';
      const text = value.trim();
      return TIME_ONLY.test(text) ? text : '';
    }

    function normalizeRepeat(value) {
      if (typeof value !== 'string') return '';
      const text = value.trim().toLowerCase();
      if (REPEATS.includes(text)) return text;
      const weekly = /^weekly:([0-6])$/.exec(text);
      if (weekly) return text;
      const monthly = /^monthly:([1-9]|[12]\d|3[01])$/.exec(text);
      if (monthly) return text;
      return '';
    }

    function normalizeTodo(item) {
      if (!item || typeof item.title !== 'string') return null;
      const now = Date.now();
      const id = typeof item.id === 'string' ? item.id : todoId();
      return {
        id,
        title: item.title.trim(),
        location: typeof item.location === 'string' ? item.location.trim() : '',
        due: normalizeDue(item.due),
        end: normalizeEnd(item.end),
        repeat: normalizeRepeat(item.repeat),
        status: item.status === 'completed' ? 'completed' : 'pending',
        color: normalizeColor(item.color, id),
        createdAt: Number(item.createdAt) || now,
        updatedAt: Number(item.updatedAt) || now,
      };
    }

    function loadTodos() {
      let currentRaw = null;
      try { currentRaw = window.localStorage.getItem(TODOS_KEY); } catch {}
      if (currentRaw !== null) {
        try {
          const current = JSON.parse(currentRaw);
          if (Array.isArray(current)) return current.map(normalizeTodo).filter((item) => item && item.title);
        } catch {}
      }
      try {
        const legacyRaw = window.localStorage.getItem(LEGACY_KEY);
        const legacy = legacyRaw ? JSON.parse(legacyRaw) : [];
        const migrated = Array.isArray(legacy) ? legacy.filter((item) => item && typeof item.text === 'string' && item.text.trim()).map((item) => {
          const id = typeof item.id === 'string' ? `legacy-${item.id}` : todoId();
          return {
            id,
            title: item.text.trim().replace(/\s+/g, ' '),
            location: '',
            due: '',
            end: '',
            repeat: '',
            status: 'pending',
            color: normalizeColor(item.color, id),
            createdAt: Number(item.createdAt) || Date.now(),
            updatedAt: Number(item.updatedAt) || Date.now(),
          };
        }) : [];
        window.localStorage.setItem(TODOS_KEY, JSON.stringify(migrated));
        return migrated;
      } catch {
        return [];
      }
    }

    let todoState = loadTodos();
    function subscribeTodos(listener) { listeners.add(listener); return () => listeners.delete(listener); }
    function setTodos(update) {
      todoState = typeof update === 'function' ? update(todoState) : update;
      try { window.localStorage.setItem(TODOS_KEY, JSON.stringify(todoState)); } catch {}
      listeners.forEach((listener) => listener());
    }
    function useTodos() {
      const [snapshot, setSnapshot] = React.useState(() => todoState);
      React.useEffect(() => subscribeTodos(() => setSnapshot(todoState)), []);
      return snapshot;
    }

    /* ---------------- date helpers ---------------- */

    function localDateKey(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }

    function parseDue(due) {
      if (!due) return null;
      const key = due.slice(0, 10);
      const time = due.length > 10 ? due.slice(11, 16) : '';
      const [y, m, d] = key.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      if (Number.isNaN(date.getTime())) return null;
      return { key, time, date, y, m, d };
    }

    function dateKey(due) {
      return due ? due.slice(0, 10) : '';
    }

    function localTodayKey(offset) {
      const date = new Date();
      date.setDate(date.getDate() + (offset || 0));
      return localDateKey(date);
    }

    function offsetLocalDateKey(days) {
      return localTodayKey(days);
    }

    function relativeDayLabel(key, copy) {
      const today = localTodayKey(0);
      const diff = Math.round((new Date(`${key}T00:00:00`).getTime() - new Date(`${today}T00:00:00`).getTime()) / 86400000);
      if (diff === 0) return copy.today;
      if (diff === 1) return copy.tomorrow;
      if (diff === 2) return copy.dayAfter;
      if (diff === -1) return copy.yesterday;
      if (diff === -2) return copy.dayBeforeYesterday || copy.yesterday;
      return '';
    }

    const WEEKDAYS_ZH = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function formatGroupDate(key, locale, copy) {
      if (!key) return copy.unscheduled;
      const relative = relativeDayLabel(key, copy);
      const date = new Date(`${key}T00:00:00`);
      if (Number.isNaN(date.getTime())) return copy.unscheduled;
      const rest = isZh(locale)
        ? `${date.getMonth() + 1} 月 ${date.getDate()} 日 ${WEEKDAYS_ZH[date.getDay()]}`
        : `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${WEEKDAYS_EN[date.getDay()]}`;
      return relative ? `${relative} · ${rest}` : rest;
    }

    function formatTime(due, locale) {
      const info = parseDue(due);
      if (!info) return '';
      if (!info.time) return copyFor(locale).allDay;
      return info.time;
    }

    function formatDueChip(due, locale, copy) {
      const info = parseDue(due);
      if (!info) return '';
      const rel = relativeDayLabel(info.key, copy) || (isZh(locale)
        ? `${info.month || info.m}月${info.d}日`
        : new Date(`${info.key}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      return info.time ? `${rel} ${info.time}` : `${rel} · ${copy.allDay}`;
    }

    function groupTodos(items) {
      const buckets = new Map();
      const ordered = [];
      items.forEach((todo) => {
        const key = dateKey(todo.due);
        if (!buckets.has(key)) {
          const bucket = { key, todos: [] };
          buckets.set(key, bucket);
          ordered.push(bucket);
        }
        buckets.get(key).todos.push(todo);
      });
      ordered.sort((a, b) => {
        if (!a.key) return 1;
        if (!b.key) return -1;
        return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
      });
      ordered.forEach((bucket) => bucket.todos.sort((a, b) => {
        if (a.status !== b.status) return a.status === 'pending' ? -1 : 1;
        const at = a.due ? a.due.slice(11, 16) : '99:99';
        const bt = b.due ? b.due.slice(11, 16) : '99:99';
        if (at !== bt) return at < bt ? -1 : 1;
        return (a.createdAt || 0) - (b.createdAt || 0);
      }));
      return ordered;
    }

    function presetDateRange(key) {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (key === 'all') return { key: 'all' };
      if (key === 'today') return { key: 'today', start: localDateKey(today), end: localDateKey(today) };
      if (key === 'next-seven') {
        const end = new Date(today); end.setDate(end.getDate() + 6);
        return { key: 'next-seven', start: localDateKey(today), end: localDateKey(end) };
      }
      if (key === 'week' || key === 'month' || key === 'overdue') return { key };
      return { key: 'all' };
    }

    function matchesDateRange(todo, range) {
      if (!range || range.key === 'all') return true;
      const key = dateKey(todo.due);
      if (!key) return false;
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const todayKey = localDateKey(today);
      if (range.key === 'overdue') {
        if (todo.status === 'completed') return false;
        if (!todo.due) return false;
        const stamp = todo.due.length > 10 ? new Date(todo.due).getTime() : new Date(`${key}T23:59`).getTime();
        return stamp < Date.now();
      }
      if (range.key === 'week') {
        const monday = new Date(today);
        monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
        const sunday = new Date(monday); sunday.setDate(sunday.getDate() + 6);
        return key >= localDateKey(monday) && key <= localDateKey(sunday);
      }
      if (range.key === 'month') {
        return key.slice(0, 7) === todayKey.slice(0, 7);
      }
      const start = range.start || '';
      const end = range.end || '';
      if (start && end) return key >= start && key <= end;
      if (start) return key >= start;
      if (end) return key <= end;
      return true;
    }

    function timeRangeLabel(range, copy) {
      if (!range || range.key === 'all') return copy.anyTime;
      if (range.key === 'today') return copy.todayOnly;
      if (range.key === 'next-seven') return copy.nextSevenDays;
      if (range.key === 'week') return copy.thisWeek;
      if (range.key === 'month') return copy.thisMonth;
      if (range.key === 'overdue') return copy.overdueOnly;
      if (range.key === 'custom') {
        const fmt = (value) => value.slice(5).replace('-', '/');
        if (range.start && range.end) return `${fmt(range.start)} – ${fmt(range.end)}`;
        if (range.start) return copy.fromDate.replace('{date}', fmt(range.start));
        if (range.end) return copy.throughDate.replace('{date}', fmt(range.end));
        return copy.customRange;
      }
      return copy.anyTime;
    }

    /* ---------------- smart parsing ---------------- */

    const CN_NUM = { '零': 0, '〇': 0, '一': 1, '二': 2, '两': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 };
    const EN_WEEKDAYS = { sunday: 0, sun: 0, monday: 1, mon: 1, tuesday: 2, tue: 2, tues: 2, wednesday: 3, wed: 3, thursday: 4, thu: 4, thur: 4, thurs: 4, friday: 5, fri: 5, saturday: 6, sat: 6 };
    const CN_WEEKDAYS = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '日': 0, '天': 0, '七': 0 };

    function cnNumber(text) {
      if (!text) return NaN;
      if (/^\d+$/.test(text)) return Number(text);
      if (text === '十') return 10;
      if (text.indexOf('十') === 0) return 10 + (CN_NUM[text[1]] || 0);
      if (text.indexOf('十') > 0) {
        const parts = text.split('十');
        return (CN_NUM[parts[0]] || 0) * 10 + (parts[1] ? CN_NUM[parts[1]] || 0 : 0);
      }
      let value = 0;
      for (const ch of text) {
        if (CN_NUM[ch] === undefined) return NaN;
        value = value * 10 + CN_NUM[ch];
      }
      return value;
    }

    function startOfDay(now) {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    function addDays(date, days) {
      const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      next.setDate(next.getDate() + days);
      return next;
    }

    /* -------- speech cleanup --------
       Voice input is not written text: hesitation sounds, repeated syllables, dangling
       cues ("地点在…") and ASR-invented punctuation all arrive. That is noise: it must
       be removed BEFORE any structure is inferred, otherwise "嗯" becomes a task and
       "地点在" becomes a place. */

    const FILLER_RE = /(?:嗯+|呃+|额+|啊+|哦+|噢+|唉+|诶+|欸+|唔+|呀+|嗷+|哎+)/g;
    const LEAD_NOISE_RE = /(^|，)\s*(?:那个|这个|然后呢|然后|就是说|就是|那么|反正|其实|所以|所以说|就是啊)\s*/g;
    const HESITATION_RE = /(^|，)\s*(?:那个|这个|然后呢|然后|但是|就是说|就是|那么|反正|其实|这样|还有呢|再说|然后呢)\s*(?=，|$)/g;
    // "地点：没有 / 没定 / 待定 / 随便" states the ABSENCE of a place.
    const PLACE_NONE_RE = /(?:地点|地址|位置)\s*(?:的?话)?\s*(?:在|是|就)?\s*[，,、\s]*\s*(?:没有|没|未|待|不定|不确定|待定|没定|不填|随便|不用|不要)[\u4e00-\u9fa5]{0,3}[吧呢啊了的]*/g;
    const DANGLING_CUE_RE = /(?:地点|地址|位置)\s*(?:在|是|就|也|的话|吧|呢|啊|，|\s)*(?=，|$)/g;
    const META_RE = /^(?:帮我)?(?:记一下|记下来|记住|提醒我|别忘了|帮我记)$/;

    function cleanSpeech(raw) {
      let text = String(raw || '');
      text = text.replace(/[\r\n]+/g, '，');
      text = text.replace(/[。；;!！?？…~～]+/g, '，');
      text = text.replace(/(?:请|麻烦|劳烦|记得)?\s*(?:你|您)?\s*(?:帮我|帮忙|给我)?\s*(?:记一下|记下来|记下|记住|记录一下|提醒我|别忘[了记]|到时候提醒我?)[吧呢啊哦嘛了的]*/g, '，');
      // "这个月/这周" carry a date; fix them before the hesitation pass eats "这个".
      text = text.replace(/这个(?=\s*(?:月|周|星期|礼拜))/g, '本');
      text = text.replace(/那个(?=\s*(?:月|周|星期|礼拜))/g, '那');
      text = text.replace(FILLER_RE, '');
      text = text.replace(PLACE_NONE_RE, '，');
      text = text.replace(DANGLING_CUE_RE, '，');
      text = text.replace(HESITATION_RE, '，');
      text = text.replace(LEAD_NOISE_RE, '$1');
      text = text.replace(/(^|，)\s*(?:哦|噢|哎|诶)?\s*(?:对了|对哦|说起来|差点忘了|差点忘记|忘记说了|补充一下|再补充|还有就是|对了对了)\s*/g, '$1');
      text = text.replace(/(?:我|俺)?\s*(?:想|要|就是|主要)?\s*说(?:的)?是\s*/g, ' ');
      text = text.replace(/^(?:我|俺)\s*(?:想|要|就是|主要)?\s*(?=[\u4e00-\u9fa5])/, '');
      text = text.replace(/[，,]\s*(?:然后|还有|另外|接着|再有|以及)\s*$/g, '');
      text = text.replace(/[，,]?\s*(?:没有|没定|待定|不确定|随便|不用)[吧呢啊了的]*\s*$/g, '');
      text = text.replace(/(?:找|抽|挑|选|另找)?(?:个|出个)?(?:空闲|空|合适|方便)?的?(?:时间|时候)|改天|某天|有空(?:的时候|时|再)?|到时候/g, ' ');
      text = text.replace(/(?:之前|以前|前|以后|之后|为止)\s*(?=[\u4e00-\u9fa5])/g, ' ');
      text = text.replace(/第\s*[一二三四五六七八九十\d]{1,2}\s*节\s*课?/g, ' ');
      text = text.replace(/第\s*[一二三四五六七八九十\d]{1,2}\s*堂\s*课?/g, ' ');
      // "吧/呢/嘛" are sentence-final particles; mid-utterance they are pure noise.
      // Keep the few words where 吧 is a real morpheme.
      text = text.replace(/(酒吧|网吧|吧台|吧唧)/g, '\u0001');
      text = text.replace(/吧+/g, '');
      text = text.replace(/\u0001/g, '吧');
      text = text.replace(/(?:大概|大约|差不多|可能|应该是|好像|似乎|估计|左右)/g, ' ');
      // "交那个教研材料" — a demonstrative pointing at nothing is not content.
      text = text.replace(/(?<![这那])那个(?=[\u4e00-\u9fa5])/g, '');
      text = text.replace(/这个(?=\s*(?:月|周|星期|礼拜))/g, '这');
      text = text.replace(/那个(?=\s*(?:月|周|星期|礼拜))/g, '那');
      text = text.replace(HESITATION_RE, '，');
      text = text.replace(/[，,、]\s*(?:[，,、]\s*)+/g, '，');
      text = text.replace(/^[，、\s]+|[，、\s]+$/g, '');
      return text.trim();
    }

    const TIME_NOISE = /(今天|明天|后天|大后天|昨天|前天|今早|今晚|明早|明晚|周[一二三四五六日天]|星期[一二三四五六日天]|礼拜[一二三四五六日天]|上午|下午|中午|晚上|早上|早晨|傍晚|夜里|凌晨|全天|每天|每日|每周|每月|工作日|[0-9]{1,2}\s*[:：]\s*[0-9]{2}|[零〇一二两三四五六七八九十0-9]{1,3}\s*[点點时時](?:半|一刻|三刻|[零〇一二两三四五六七八九十0-9]{1,3}\s*分?)?|到|至|-|~|～|\s|，|—|的|了|吧|呢)/g;

    /* Verbs describing what the user DOES. "在改试卷" is a place phrase only
       grammatically — it is an action, never a location. Single-character verbs are
       deliberately excluded here: "学校" also starts with 学. */
    const ACTION_WORDS = [
      '改试卷', '批改', '备课', '开会', '上课', '听课', '吃饭', '交材料', '复习', '考试', '打卡', '值班',
      '加班', '出差', '买菜', '买', '取快递', '写作业', '写', '看', '做', '送', '取', '还', '洗', '打扫',
      '整理', '准备', '联系', '发给', '读', '练习', '约', '订', '接', '陪', '带', '修', '搬', '寄', '付',
      '查', '问', '打印', '复印', '研究', '讨论', '汇报', '面试', '体检', '跑步', '健身', '睡觉', '休息',
      '回家', '出门', '爬山', '散步', '洗衣', '煮饭', '做饭', '刷题', '背单词', '拿药', '排队', '看电视',
    ];
    const ACTION_BLOCK = ACTION_WORDS.filter((word) => word.length >= 2);
    // unambiguous single-char verbs that cannot begin a place name
    const VERB_START = /^(?:看|写|做|买|卖|洗|煮|刷|背|拿|排|散|跑|睡|吃|喝|打|读|练|修|搬|寄|付|查|问|送|取|还|约|订|接|陪|带|放|装|换|扔|扫|擦)/;

    const PLACE_HEAD = /(办公室|会议室|教室|学校|医院|公司|宿舍|食堂|图书馆|操场|健身房|超市|银行|邮局|车站|机场|实验室|机房|礼堂|报告厅|公园|广场|商场|饭店|餐厅|咖啡厅|咖啡店|奶茶店|诊所|药店|书店|网吧|酒店|宾馆|小区|门口|大厅|前台|家里|家|楼上|楼下|隔壁|附近|操场|体育馆|运动场|[一二三四五六七八九十\d]+号楼|[一二三四五六七八九十\d]+楼|[一二三四五六七八九十\d]+层)/;
    const PLACE_TAIL = /(室|厅|馆|店|院|校|园|场|站|台|楼|层|部|处|所|局|厂|库|口)$/;
    const PLACE_STOP = /^(没有|没事|没|有|不|没在|这儿|这儿吧|那里|这|那|哪|哪儿|哪里|这边|那边|一起|我|我们|你|你们|他|他们|她|它|谁|什么|哪儿呢|算了|怎样|怎么样)$/;

    function tidyPlace(value) {
      return String(value || '')
        .replace(/^(?:那个|这个|那|这|还有|然后|就)\s*(?=[\u4e00-\u9fa5])/, '')
        .replace(/^[的在了到去回至]+/, '')
        .replace(/^(?:一趟|一下|一次|一趟儿)\s*/, '')
        .replace(/[的了吧呢啊呀嘛哦]+$/, '')
        .replace(/^[，、\s]+|[，、\s]+$/g, '')
        .trim();
    }

    // 2 = certain (lexicon / known / explicit cue), 1 = probable, 0 = not a place
    function placeChain(text) {
      let rest = String(text || "").trim();
      let guard = 0;
      while (rest && guard < 6) {
        const hit = PLACE_HEAD.exec(rest);
        if (!hit || hit.index !== 0) return "";
        rest = rest.slice(hit[0].length);
        guard += 1;
      }
      return rest ? "" : String(text || "").trim();
    }

    // 2 = certain (lexicon / known / explicit cue), 1 = probable, 0 = not a place
    function placeScore(value, known) {
      const text = tidyPlace(value);
      if (!text || text.length > 20) return 0;
      if (PLACE_STOP.test(text)) return 0;
      if (/地点|位置|地址|地方|什么时候|时间|日期/.test(text)) return 0;
      if (!/[\u4e00-\u9fa5A-Za-z0-9]/.test(text)) return 0;
      if (known && known.indexOf(text) >= 0) return 2;
      const blocked = ACTION_BLOCK.some((word) => text.indexOf(word) >= 0);
      if (blocked) return 0;
      if (placeChain(text)) return 2;
      if (PLACE_TAIL.test(text)) return 2;
      if (/^[A-Za-z][A-Za-z0-9 .'-]{1,23}$/.test(text)) return 2;
      if (VERB_START.test(text)) return 0;
      if (!text.replace(TIME_NOISE, "").trim()) return 0;
      if (/^[\u4e00-\u9fa5]{2,8}$/.test(text)) return 1;
      return 0;
    }

    // "在超市买牛奶" → place "超市", the rest stays in the title.
    function containsAction(text) {
      return ACTION_WORDS.some((word) => word.length >= 1 && text.indexOf(word) >= 0);
    }

    function cutPlace(captured, known, requireCertain) {
      const cap = tidyPlace(captured);
      const max = Math.min(cap.length, 12);
      for (let len = max; len >= 1; len -= 1) {
        const prefix = cap.slice(0, len);
        const score = placeScore(prefix, known);
        if (score >= 2) return prefix;
      }
      if (cap && cap.length <= 8 && !containsAction(cap) && !VERB_START.test(cap) && placeScore(cap, known) >= 1) return cap;
      return "";
    }

    function looksLikeTask(text) {
      const value = String(text || '').trim();
      if (value.length < 2) return false;
      if (!/[\u4e00-\u9fa5A-Za-z0-9]/.test(value)) return false;
      if (/^(在|到|去|回|和|跟|与|同|从|给|地点|地址|位置|时间|日期|然后|还有|另外)/.test(value)) return false;
      if (!value.replace(TIME_NOISE, '').trim()) return false;
      if (PLACE_STOP.test(value)) return false;
      return true;
    }

    // A clause that only refines the previous one ("在办公室" / "地点：会议室" / "下午三点").
    function isRefinement(chunk) {
      if (!chunk) return true;
      if (META_RE.test(chunk)) return true;
      if (/^(地点|地址|位置|时间|日期)/.test(chunk)) return true;
      if (/^在/.test(chunk) && placeScore(chunk.slice(1)) >= 1) return true;
      if (/^(到|去|回)/.test(chunk) && cutPlace(chunk.slice(1), null, false)) return true;
      if (!chunk.replace(TIME_NOISE, '').trim()) return true;
      if (!looksLikeTask(chunk)) return true;
      return false;
    }

    const NOTHING_RE = /^(?:算了|没事|没什么|不用了|取消|没有|空着|那什么|什么|嗯嗯)+$/;

    const DATE_HINT_RE = /(今天|明天|后天|大后天|周[一二三四五六日天]|星期[一二三四五六日天]|上午|下午|中午|晚上|早上|早晨|傍晚|凌晨|[零〇一二两三四五六七八九十\d]{1,3}\s*[点點时時]|\d{1,2}\s*[:：]\s*\d{2})/;
    const CANCEL_TAIL_RE = /(?:取消|算了|不去了|不做了|不用了|放弃了?|拉倒|不弄了)[吧了呢啊哦嘛了的]*$/;
    const SOFT_SPLIT_RE = /\s*(?:顺便(?:还)?|顺带|另外|接着|再有|以及|然后再|然后)\s*/g;

    // "周五 交周报 和 下周一 交总结": a connector between two dated clauses is a
    // task boundary. Without a date on both sides it is ordinary speech ("开会和备课").
    function splitAtConnectors(text) {
      const re = /\s*(?:和|跟|与|及|还有|以及)\s*/g;
      let out = '';
      let last = 0;
      let hit;
      while ((hit = re.exec(text))) {
        const before = text.slice(0, hit.index);
        const after = text.slice(hit.index + hit[0].length);
        const beforeIsTimeOnly = !before.replace(TIME_NOISE, '').trim();
        const afterIsTimeOnly = /^(?:大?后天|明天|今天|明年|周[一二三四五六日天]|星期[一二三四五六日天]|上午|下午|晚上|早上|中午)/.test(after.trim());
        if (beforeIsTimeOnly && afterIsTimeOnly) continue;
        if (DATE_HINT_RE.test(before) && DATE_HINT_RE.test(after)) {
          out += text.slice(last, hit.index) + '，';
          last = hit.index + hit[0].length;
        }
      }
      return last ? out + text.slice(last) : text;
    }

    // "明天 上午九点 开会 下午三点 见客户": two clock groups in one clause are two events.
    function splitByTimeGroups(chunk) {
      const token = /(今天|明天|后天|大后天|今早|今晚上|今晚|明早|明晚|周[一二三四五六日天]|星期[一二三四五六日天]|上午|下午|中午|晚上|早上|早晨|傍晚|夜里|凌晨|\d{1,2}\s*[:：]\s*\d{2}|[零〇一二两三四五六七八九十\d]{1,3}\s*[点點时時])/g;
      const hits = [];
      let hit;
      while ((hit = token.exec(chunk))) hits.push({ start: hit.index, end: hit.index + hit[0].length });
      if (hits.length < 2) return [chunk];
      const groups = [];
      hits.forEach((item) => {
        const prev = groups[groups.length - 1];
        if (prev && !chunk.slice(prev.end, item.start).replace(/[\s的]/g, '')) { prev.end = item.end; return; }
        groups.push({ start: item.start, end: item.end });
      });
      if (groups.length < 2) return [chunk];
      const parts = [];
      let last = 0;
      for (let i = 1; i < groups.length; i += 1) {
        const gap = chunk.slice(groups[i - 1].end, groups[i].start);
        if (!gap.replace(/[\s，,的]/g, '')) continue;
        if (/[到至—~～-]/.test(gap)) continue;
        parts.push(chunk.slice(last, groups[i].start).trim());
        last = groups[i].start;
      }
      parts.push(chunk.slice(last).trim());
      return parts.filter(Boolean);
    }

    function splitTasks(raw) {
      const rawText = String(raw || '').trim();
      if (/(?:取消|算了|不用了|不去了|不做了|放弃了?|拉倒|不弄了)[吧了呢啊哦嘛了的]*$/.test(rawText)) return [];
      let text = cleanSpeech(raw);
      if (!text || NOTHING_RE.test(text.replace(/[\s，,]+/g, ''))) return [];
      // "明天的会 取消吧" is a cancellation, not a new note.
      if (CANCEL_TAIL_RE.test(text)) return [];
      text = splitAtConnectors(text).replace(SOFT_SPLIT_RE, '，');
      const chunks = text.split(/[，,；;、\n]+/).map((value) => value.trim()).filter(Boolean).flatMap(splitByTimeGroups);
      const tasks = [];
      let current = '';
      chunks.forEach((chunk) => {
        if (!current) { current = chunk; return; }
        const openEnded = /(在|到|去|回|从|和|跟|与|给|是|的|把|被|于)$/.test(current);
        if (openEnded || isRefinement(chunk)) {
          current = `${current}，${chunk}`;
          return;
        }
        tasks.push(current);
        current = chunk;
      });
      if (current) tasks.push(current);
      return tasks
        .map((value) => value.replace(/[，,]{2,}/g, '，').replace(/^[，,\s]+|[，,\s]+$/g, '').trim())
        .filter(Boolean);
    }

    const RANGE_CN_RE = /(?:从\s*)?([零〇一二两三四五六七八九十\d]{1,3})\s*(?:[:：]\s*(\d{2}))?\s*[点點时時]\s*(半|一刻|三刻)?\s*(?:到|至|—|~|～|-)\s*([零〇一二两三四五六七八九十\d]{1,3})\s*(?:[:：]\s*(\d{2}))?\s*[点點时時]\s*(半|一刻|三刻|[零〇一二两三四五六七八九十\d]{1,3}\s*分?)?/;
    const RANGE_NUM_RE = /(\d{1,2})\s*[:：]\s*(\d{2})\s*(?:到|至|—|~|～|-)\s*(\d{1,2})\s*[:：]\s*(\d{2})/;

    function minuteFromWord(word) {
      if (!word) return 0;
      if (word.indexOf('半') >= 0) return 30;
      if (word.indexOf('一刻') >= 0) return 15;
      if (word.indexOf('三刻') >= 0) return 45;
      const value = cnNumber(String(word).replace('分', '').trim());
      return !Number.isNaN(value) && value < 60 ? value : 0;
    }

    const REPEAT_RULES = [
      [/每(?:天|日)|天天|每日|\bevery\s*day\b|\bdaily\b/i, 'daily'],
      [/工作日|周一到周五|周一至周五|weekdays?/i, 'weekday'],
      [/每\s*(?:个)?(?:周|星期|礼拜)\s*([一二三四五六日天])/, null],
      [/每\s*(?:个)?(?:周|星期|礼拜)(?!\s*[一二三四五六日天])|\bevery\s*week\b|\bweekly\b/i, 'weekly'],
      [/每\s*个?\s*月\s*([零〇一二两三四五六七八九十\d]{1,3})\s*[日号]/, null],
      [/每\s*个?\s*月(?!\s*\d)|\bevery\s*month\b|\bmonthly\b/i, 'monthly'],
      [/\bevery\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)\b/i, null],
    ];

    // Parses one phrase into { title, location, due, end, repeat, hasDate, hasTime }
    function parseSmart(raw, nowInput, knownPlaces) {
      const now = nowInput ? new Date(nowInput) : new Date();
      now.setSeconds(0, 0);
      let text = ` ${String(raw || '').replace(/\s+/g, ' ').replace(/[，,]{2,}/g, '，').trim()} `;
      const out = { title: '', location: '', due: '', end: '', repeat: '', hasDate: false, hasTime: false };
      const known = Array.isArray(knownPlaces) ? knownPlaces.filter(Boolean) : [];
      let day = null;
      let start = null;
      let finish = null;
      let repeat = '';
      let weekdayToday = false;
      const eat = (index, length) => { text = text.slice(0, index) + ' '.repeat(length) + text.slice(index + length); };
      const find = (re) => re.exec(text);
      let m;

      // recurrence first, so "每周一" is never read as a one-off "周一"
      for (const [re, kind] of REPEAT_RULES) {
        const hit = re.exec(text);
        if (!hit) continue;
        if (kind) repeat = kind;
        else if (hit[1] && /月/.test(hit[0])) repeat = `monthly:${cnNumber(hit[1])}`;
        else if (hit[1] && /^[A-Za-z]/.test(hit[0].trim()) && EN_WEEKDAYS[hit[1].toLowerCase()] !== undefined) repeat = `weekly:${EN_WEEKDAYS[hit[1].toLowerCase()]}`;
        else repeat = `weekly:${CN_WEEKDAYS[hit[1]]}`;
        eat(hit.index, hit[0].length);
        break;
      }

      const later = find(/(\d+|[零〇一二两三四五六七八九十]{1,3})\s*天[之以]?后|\bin\s+(\d+)\s*days?\b/i);
      if (later) {
        const amount = cnNumber(String(later[1] || later[2]).trim());
        if (!Number.isNaN(amount)) { day = addDays(now, amount); eat(later.index, later[0].length); }
      }

      const rel = [[/大后天/, 3], [/后天/, 2], [/明天|明日|明儿|tomorrow/i, 1], [/今天|今日|today/i, 0], [/前天/, -2], [/昨天|yesterday/i, -1]];
      let relHit = null;
      let relOffset = 0;
      for (const [re, offset] of rel) {
        const hit = find(re);
        if (!hit) continue;
        if (day && hit[0] === '后天' && /[0-9零〇一二两三四五六七八九十]\s*$/.test(text.slice(0, hit.index))) continue;
        if (!relHit || hit.index < relHit.index || (hit.index === relHit.index && hit[0].length > relHit[0].length)) {
          relHit = hit;
          relOffset = offset;
        }
      }
      for (const [re, offset] of (relHit ? [[relHit[0], relOffset]] : [])) {
        const hit = relHit;
        {
          day = addDays(now, offset);
          const modifier = /^\s*的/.exec(text.slice(hit.index + hit[0].length));
          const before = text.slice(0, hit.index).trim();
          if (modifier && before && /[\u4e00-\u9fa5]/.test(before)) {
            day = null; // keep the whole noun phrase inside the title
          } else {
            eat(hit.index, hit[0].length + (modifier ? modifier[0].length : 0));
            break;
          }
        }
      }

      if (!day) {
        let hit = find(/下下(?:周|星期|礼拜)\s*([一二三四五六日天])/);
        let plus = 14;
        if (!hit) { hit = find(/下(?:个)?(?:周|星期|礼拜)\s*([一二三四五六日天])/); plus = 7; }
        if (!hit) { hit = find(/(?:这|本)?(?:周|星期|礼拜)\s*([一二三四五六日天])/); plus = 0; }
        if (hit) {
          const targetMon = (CN_WEEKDAYS[hit[1]] + 6) % 7;
          const todayMon = (now.getDay() + 6) % 7;
          let delta = targetMon - todayMon;
          if (plus === 0 && delta < 0) delta += 7;
          if (plus > 0) delta += plus;
          day = addDays(now, delta);
          if (plus === 0 && localDateKey(day) === localDateKey(now)) weekdayToday = true;
          eat(hit.index, hit[0].length);
        }
      }

      if (!day) {
        const hit = find(/\b(next\s+)?(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|tues|wed|thu|thur|thurs|fri|sat|sun)\b/i);
        if (hit) {
          const target = (EN_WEEKDAYS[hit[2].toLowerCase()] + 6) % 7;
          const todayMon = (now.getDay() + 6) % 7;
          let delta = target - todayMon;
          if (delta <= 0) delta += 7;
          day = addDays(now, delta);
          eat(hit.index, hit[0].length);
        }
      }

      if (!day) {
        const hit = find(/(下下周|下(?:个)?(?:周|星期|礼拜)(?!\s*[一二三四五六日天末])|这周(?!\s*末)|本周(?!\s*末)|这个星期|这星期)/);
        if (hit) {
          const todayMon = (now.getDay() + 6) % 7;
          const weeks = /^下下/.test(hit[0]) ? 2 : (/^下/.test(hit[0]) ? 1 : 0);
          day = weeks ? addDays(now, (7 - todayMon) % 7 + (weeks - 1) * 7 || 7 * weeks) : startOfDay(now);
          if (weeks === 1) day = addDays(now, ((7 - todayMon) % 7) || 7);
          eat(hit.index, hit[0].length);
        }
      }

      if (!day) {
        const hit = find(/(?:这|本)?周末|下周末|weekend/i);
        if (hit) {
          const todayMon = (now.getDay() + 6) % 7;
          let delta = 5 - todayMon;
          if (delta < 0) delta += 7;
          if (/下/.test(hit[0])) delta += 7;
          day = addDays(now, delta);
          eat(hit.index, hit[0].length);
        }
      }

      if (day) {
        const pair = /^\s*(?:和|跟|与|、|及|\/|\-|~|至|到)\s*(?:大?后天|明天|今天|昨天)/.exec(text);
        if (pair) eat(pair === null ? 0 : text.indexOf(pair[0]), pair[0].length);
      }

      if (!day) {
        const cnDate = find(/([一二两三四五六七八九十]{1,3})\s*月\s*([一二两三四五六七八九十]{1,3})\s*[日号]/);
        if (cnDate) {
          const month = cnNumber(cnDate[1]);
          const date = cnNumber(cnDate[2]);
          if (month >= 1 && month <= 12 && date >= 1 && date <= 31) {
            day = new Date(now.getFullYear(), month - 1, date);
            if (day < startOfDay(now)) day = new Date(now.getFullYear() + 1, month - 1, date);
            eat(cnDate.index, cnDate[0].length);
          }
        }
      }

      if (!day) {
        const thisMonth = find(/(?:这个月|这月|本月)\s*([零〇一二两三四五六七八九十\d]{1,3})\s*[日号]/);
        if (thisMonth) {
          const target = cnNumber(thisMonth[1]);
          if (target >= 1 && target <= 31) {
            day = new Date(now.getFullYear(), now.getMonth(), target);
            if (day < startOfDay(now)) day = new Date(now.getFullYear(), now.getMonth() + 1, target);
            eat(thisMonth.index, thisMonth[0].length);
          }
        }
      }

      if (!day) {
        let hit = find(/(\d{1,2})\s*月\s*(\d{1,2})\s*[日号]/);
        if (hit) {
          day = new Date(now.getFullYear(), Number(hit[1]) - 1, Number(hit[2]));
          if (day < startOfDay(now)) day = new Date(now.getFullYear() + 1, Number(hit[1]) - 1, Number(hit[2]));
          eat(hit.index, hit[0].length);
        } else if ((hit = find(/(\d{1,2})\s*\/\s*(\d{1,2})(?!\d)/)) && Number(hit[1]) <= 12 && Number(hit[2]) <= 31) {
          day = new Date(now.getFullYear(), Number(hit[1]) - 1, Number(hit[2]));
          if (day < startOfDay(now)) day = new Date(now.getFullYear() + 1, Number(hit[1]) - 1, Number(hit[2]));
          eat(hit.index, hit[0].length);
        } else if ((hit = find(/下\s*个?\s*月\s*([零〇一二两三四五六七八九十\d]{1,3})\s*[日号]/))) {
          const target = cnNumber(hit[1]);
          if (target >= 1 && target <= 31) {
            day = new Date(now.getFullYear(), now.getMonth() + 1, target);
            eat(hit.index, hit[0].length);
          }
        } else if ((hit = find(/([零〇一二两三四五六七八九十\d]{1,3})\s*[日号](?!\s*[点點:：\d])/))) {
          const target = cnNumber(hit[1]);
          let date = new Date(now.getFullYear(), now.getMonth(), target);
          if (target < now.getDate()) date = new Date(now.getFullYear(), now.getMonth() + 1, target);
          day = date;
          eat(hit.index, hit[0].length);
        }
      }

      if ((m = RANGE_NUM_RE.exec(text))) {
        const h1 = Number(m[1]); const n1 = Number(m[2]);
        const h2 = Number(m[3]); const n2 = Number(m[4]);
        if (h1 <= 23 && h2 <= 23 && n1 <= 59 && n2 <= 59) {
          start = h1 * 60 + n1;
          finish = h2 * 60 + n2;
          eat(m.index, m[0].length);
        }
      }

      if (start === null && (m = RANGE_CN_RE.exec(text))) {
        const first = cnNumber(m[1]);
        const second = cnNumber(m[4]);
        if (!Number.isNaN(first) && !Number.isNaN(second) && first <= 24 && second <= 24) {
          start = (first % 24) * 60 + (m[2] ? Number(m[2]) : minuteFromWord(m[3]));
          finish = (second % 24) * 60 + (m[5] ? Number(m[5]) : minuteFromWord(m[6]));
          eat(m.index, m[0].length);
        }
      }

      if (start === null && (m = find(/(\d{1,2})\s*[:：]\s*(\d{2})/))) {
        const hh = Number(m[1]);
        const mm = Number(m[2]);
        if (hh <= 23 && mm <= 59) { start = hh * 60 + mm; eat(m.index, m[0].length); }
      }

      if (start === null && (m = find(/([零〇一二两三四五六七八九十\d]{1,3})\s*[点點时時]\s*(半|一刻|三刻|[零〇一二两三四五六七八九十\d]{1,3}\s*分?)?/))) {
        const hh = cnNumber(m[1]);
        if (!Number.isNaN(hh) && hh <= 24) {
          start = (hh % 24) * 60 + minuteFromWord(m[2]);
          eat(m.index, m[0].length);
        }
      }

      if (start === null && (m = find(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)\b/i))) {
        let hh = Number(m[1]);
        const mm = Number(m[2] || 0);
        const ap = m[3].toLowerCase();
        if (ap[0] === 'p' && hh < 12) hh += 12;
        if (ap[0] === 'a' && hh === 12) hh = 0;
        start = hh * 60 + mm;
        eat(m.index, m[0].length);
      }

      if (start === null && (m = find(/\bat\s+(\d{1,2})\s*o'?clock\b|\b(\d{1,2})\s*o'?clock\b/i))) {
        const hh = Number(m[1] || m[2]);
        if (hh <= 23) { start = hh * 60; eat(m.index, m[0].length); }
      }

      const pmHint = /下午|午后|傍晚|晚上|夜里|今晚|明晚|evening|tonight|afternoon/i.test(text);
      if (start === null) {
        let pod = null;
        if (/上午|早上|早晨|清晨|\bmorning\b/i.test(text)) pod = 9;
        else if (/中午|正午|\bnoon\b/i.test(text)) pod = 12;
        else if (/下午|午后|\bafternoon\b/i.test(text)) pod = 15;
        else if (/傍晚|黄昏|\bevening\b/i.test(text)) pod = 18;
        else if (/晚上|夜里|今晚|明晚|\btonight\b|\bnight\b/i.test(text)) pod = 20;
        if (pod !== null) start = pod * 60;
      } else if (pmHint && start < 12 * 60) {
        start += 12 * 60;
        if (finish !== null && finish < 12 * 60) finish += 12 * 60;
      }
      // "十一点到一点" means 11:00–13:00: the end inherits the start's half of the day.
      if (start !== null && finish !== null && finish <= start && finish + 12 * 60 <= 24 * 60) finish += 12 * 60;

      // "这周日下午" said at 19:30 on Sunday can only mean the coming Sunday.
      if (weekdayToday && start !== null && start <= now.getHours() * 60 + now.getMinutes()) {
        day = addDays(now, 7);
      }

      text = text.replace(/今晚上|明晚上|大后天|今天早上|明天早上|今天上午|明天上午|今天下午|明天下午|今天晚上|明天晚上|今早|明早|今晚|明晚|上午|早上|早晨|清晨|中午|正午|下午|午后|傍晚|黄昏|晚上|夜里|凌晨|点钟|左右|前后|的时候/g, ' ')
        .replace(/\b(morning|afternoon|evening|noon|tonight|night)\b/gi, ' ');

      // --- location, strongest cue first ---
      const eatPlace = (match, place) => {
        const prefix = match[0].length - match[1].length;
        const inner = match[1].indexOf(place);
        eat(match.index, prefix + (inner >= 0 ? inner : 0) + place.length);
      };
      const takePlace = (cap, requireCertain) => {
        const place = cutPlace(cap, known, requireCertain);
        return place || '';
      };

      if (!out.location && (m = find(/(?:地点|地址|位置)\s*(?:在|是|:|：)?\s*([^\s，]{1,24})/))) {
        const place = takePlace(m[1], false);
        if (place) {
          out.location = tidyPlace(place);
          eatPlace(m, place);
        }
      }

      if (!out.location && (m = find(/在\s*([^\s，]{1,24})/))) {
        const place = takePlace(m[1], false);
        if (place) {
          out.location = tidyPlace(place);
          eatPlace(m, place);
        }
      }

      if (!out.location && known.length) {
        const sorted = known.slice().sort((a, b) => b.length - a.length);
        for (const place of sorted) {
          if (!place || place.length < 2) continue;
          const index = text.indexOf(place);
          if (index < 0) continue;
          out.location = place;
          eat(index, place.length);
          break;
        }
      }

      if (!out.location && (m = find(/(?:去|到|回)\s*([^\s，]{1,24})/))) {
        const place = takePlace(m[1], true);
        if (place) {
          out.location = tidyPlace(place);
          eatPlace(m, place);
        }
      }

      if (!out.location && (m = find(/\bat\s+(?:the\s+)?([A-Za-z0-9'\u4e00-\u9fa5._-][A-Za-z0-9'\u4e00-\u9fa5 ._-]{0,23})/i))) {
        const place = takePlace(m[1], false);
        if (place) {
          out.location = tidyPlace(place);
          eatPlace(m, place);
        }
      }

      // --- title ---
      if (out.location && !out.title) {
        const inline = find(/在\s*([^\s，]{1,20})/);
        const place = inline ? takePlace(inline[1], true) : '';
        if (place && place !== out.location) eatPlace(inline, place);
      }
      let title = text.replace(/\s+/g, ' ').trim();
      title = title.replace(/^在(?=[\u4e00-\u9fa5])/, '');
      title = title.replace(/[，,、;；:：]+/g, '，');
      title = title.replace(/(?:^|，)[ ，]*/g, '，').replace(/，{2,}/g, '，');
      title = title.replace(/^[，、\s]+|[，、\s]+$/g, '');
      title = title.replace(/^(?:然后|还有|另外|以及|那个|就是)[，,\s]*/, '');
      title = title.replace(/^(?:我|我们|你|您|他|她)\s*(?:要|得|需要|准备|打算|想|应该|必须|记得)?\s*/, '');
      title = title.replace(/^的\s*(?=[\u4e00-\u9fa5])/, '');
      if (title.replace(/[，,\s]/g, '').length >= 3) {
        title = title.replace(/^(?:要|得|需要|准备|打算|应该|必须|记得)\s*(?=[\u4e00-\u9fa5]{2})/, '');
      }
      title = title.replace(/[，,\s]*(?:吧|呢|啊|呀|哦|嘛)$/g, '');
      // "把材料交到办公室" → "交材料到办公室". A particle right after the verb ("把作业交了")
      // means the object already had its verb, so leave that sentence alone.
      title = title.replace(/^把([\u4e00-\u9fa5]{1,10}?)(交|送|放|拿|给|带|寄|发|传|抄|写|做)(?![了吧呢啊呀嘛的])/, '$2$1');
      title = title.replace(/^把([\u4e00-\u9fa5]{1,10}?)(交|送|放|拿|给|带|寄|发|传|抄|写|做)了$/, '$2$1');
      title = title.replace(/(?:地点|地址|位置)(?:在|是)?$/g, '');
      title = title.replace(/[在到从去的和跟与]+$/g, '');
      title = title.replace(/\s*(?=[，,])|[，,]\s*/g, '，');
      title = title.replace(/\s+(?=[\u4e00-\u9fa5])|(?<=[\u4e00-\u9fa5])\s+/g, '');
      title = title.replace(/[，,\s]+$/g, '').trim();
      out.title = title;

      if (!title.replace(/[，,\s]/g, '') && out.location && /[去到回]/.test(cleanSpeech(raw))) {
        const fallback = cleanSpeech(raw)
          .replace(/(?:下下周|下(?:个)?(?:周|星期|礼拜)|这周|本周|这个月|这月)/g, ' ')
          .replace(new RegExp(TIME_NOISE.source, 'g'), ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (fallback) { title = fallback; out.title = fallback; out.location = ''; }
      }

      out.hasDate = Boolean(day);
      out.hasTime = start !== null;
      out.repeat = repeat;

      if (repeat.indexOf('weekly:') === 0 && !day) {
        const target = Number(repeat.split(':')[1]);
        let delta = ((target + 6) % 7) - ((now.getDay() + 6) % 7);
        if (delta < 0) delta += 7;
        day = addDays(now, delta);
      }

      if (!day && repeat.indexOf('monthly:') === 0) {
        const target = Number(repeat.split(':')[1]) || 1;
        let candidate = new Date(now.getFullYear(), now.getMonth(), target);
        if (candidate < startOfDay(now)) candidate = new Date(now.getFullYear(), now.getMonth() + 1, target);
        day = candidate;
      }

      if (!day && start !== null) {
        const todayMinutes = now.getHours() * 60 + now.getMinutes();
        day = startOfDay(now);
        if (start <= todayMinutes) day = addDays(day, 1);
      }
      if (!day && repeat) day = startOfDay(now);

      if (day) {
        const key = localDateKey(day);
        out.due = start !== null
          ? `${key}T${String(Math.floor(start / 60)).padStart(2, '0')}:${String(start % 60).padStart(2, '0')}`
          : key;
      }

      if (finish !== null && finish !== start) {
        if (finish > 24 * 60) finish = 24 * 60;
        out.end = `${String(Math.floor(finish / 60)).padStart(2, '0')}:${String(finish % 60).padStart(2, '0')}`;
      }

      return out;
    }

    function hasContent(item) {
      return Boolean((item.title && item.title.replace(/[，,\s]/g, '').length > 0) || item.location || item.due);
    }

    function planSmart(raw, nowInput, knownPlaces) {
      const parts = splitTasks(raw);
      if (!parts.length) return [];
      const parsed = parts.map((part) => parseSmart(part, nowInput, knownPlaces));
      // A leading fragment ("明天下午三点" split by a comma) carries date/time only:
      // fold it into the task that follows instead of inventing an empty note.
      const merged = [];
      let carry = null;
      parsed.forEach((item) => {
        const titled = item.title && item.title.replace(/[，,\s]/g, '').length > 0;
        if (!titled) {
          if (!carry) carry = { due: '', end: '', location: '', repeat: '' };
          if (item.due && !carry.due) carry.due = item.due;
          if (item.end && !carry.end) carry.end = item.end;
          if (item.location && !carry.location) carry.location = item.location;
          if (item.repeat && !carry.repeat) carry.repeat = item.repeat;
          return;
        }
        if (carry) {
          if (!item.due && carry.due) item.due = carry.due;
          if (!item.end && carry.end) item.end = carry.end;
          if (!item.location && carry.location) item.location = carry.location;
          if (!item.repeat && carry.repeat) item.repeat = carry.repeat;
          carry = null;
        }
        merged.push(item);
      });
      if (carry && merged.length) {
        const last = merged[merged.length - 1];
        if (carry.due && !last.due) last.due = carry.due;
        if (carry.due && last.due && last.due.length <= 10 && carry.due.length > 10 && carry.due.slice(0, 10) === last.due) {
          last.due = carry.due; last.hasTime = true;
        }
        if (carry.end && !last.end) last.end = carry.end;
        if (carry.location && !last.location) last.location = carry.location;
        if (carry.repeat && !last.repeat) last.repeat = carry.repeat;
        if (carry.due) last.hasDate = true;
        if (carry.due && last.due === carry.due && /T/.test(carry.due)) last.hasTime = true;
        carry = null;
      }

      if (merged.length > 1) {
        const base = merged[0];
        merged.forEach((item, index) => {
          if (index === 0) return;
          if (item.due && item.hasTime && !item.hasDate && base.due && base.hasDate) {
            item.due = base.due.slice(0, 10) + item.due.slice(10);
          }
          if (!item.due && base.due) item.due = base.due;
          if (!item.end && base.end) item.end = base.end;
          if (!item.repeat && base.repeat) item.repeat = base.repeat;
        });
      }
      return merged.filter(hasContent);
    }
    /* ---------------- icons ---------------- */

    function svg(paths, size) {
      return h('svg', { viewBox: '0 0 24 24', width: size || 16, height: size || 16, fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, paths.map((d, index) => h('path', { key: index, d })));
    }

    function PlusIcon() { return svg(['M12 5v14', 'M5 12h14'], 20); }
    function SearchIcon() { return svg(['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'M20 20l-4.2-4.2'], 15); }
    function TrashIcon() { return svg(['M4 7h16', 'M9 7V5h6v2', 'M6 7l1 13h10l1-13'], 15); }
    function LocationIcon() { return svg(['M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z', 'M12 10.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z'], 15); }
    function ClockIcon() { return svg(['M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17z', 'M12 7.6V12l3 1.9'], 15); }
    function CalendarIcon() { return svg(['M5 8h14v11H5z', 'M5 8V6.5A1.5 1.5 0 0 1 6.5 5H8', 'M16 5h1.5A1.5 1.5 0 0 1 19 6.5V8', 'M8.5 3v4', 'M15.5 3v4'], 15); }
    function MicIcon() { return svg(['M12 4.5a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0V7A2.5 2.5 0 0 1 12 4.5z', 'M6.5 11.5a5.5 5.5 0 0 0 11 0', 'M12 17v3', 'M9 20h6'], 16); }
    function CheckIcon() { return svg(['M5 12.5l4.6 4.5L19 7'], 16); }
    function ChevronLeftIcon() { return svg(['M14.5 6l-6 6 6 6'], 16); }
    function ChevronRightIcon() { return svg(['M9.5 6l6 6-6 6'], 16); }
    function CloseIcon() { return svg(['M6 6l12 12', 'M18 6L6 18'], 16); }

    /* ---------------- time range filter ---------------- */

    function TimeRangeFilter({ value, copy, onChange }) {
      const [open, setOpen] = React.useState(false);
      const [draftStart, setDraftStart] = React.useState('');
      const [draftEnd, setDraftEnd] = React.useState('');
      const rootRef = React.useRef(null);
      const invalid = Boolean(draftStart && draftEnd && draftStart > draftEnd);
      const active = value.key !== 'all';
      const quickRanges = [
        ['all', copy.anyTime],
        ['today', copy.todayOnly],
        ['next-seven', copy.nextSevenDays],
        ['week', copy.thisWeek],
        ['month', copy.thisMonth],
        ['overdue', copy.overdueOnly],
      ];

      React.useEffect(() => {
        if (!open) return undefined;
        const closeOutside = (event) => { if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false); };
        const closeOnEscape = (event) => { if (event.key === 'Escape') setOpen(false); };
        document.addEventListener('pointerdown', closeOutside);
        window.addEventListener('keydown', closeOnEscape);
        return () => {
          document.removeEventListener('pointerdown', closeOutside);
          window.removeEventListener('keydown', closeOnEscape);
        };
      }, [open]);

      function toggle() {
        if (!open) {
          setDraftStart(value.key === 'custom' ? value.start : '');
          setDraftEnd(value.key === 'custom' ? value.end : '');
        }
        setOpen((current) => !current);
      }

      return h('div', { className: 'todo-time-filter', ref: rootRef },
        h('button', {
          type: 'button',
          className: `todo-time-trigger${active ? ' is-active' : ''}`,
          onClick: toggle,
          'aria-label': copy.timeFilter,
          'aria-expanded': open,
          'aria-haspopup': 'dialog',
        }, h(CalendarIcon), h('span', null, timeRangeLabel(value, copy))),
        open ? h('section', { className: 'todo-time-popover', role: 'dialog', 'aria-label': copy.timeFilter },
          h('div', { className: 'todo-time-quick' }, quickRanges.map(([key, label]) => h('button', {
            key,
            type: 'button',
            className: value.key === key ? 'is-active' : '',
            onClick: () => { onChange(presetDateRange(key)); setOpen(false); },
          }, label))),
          h('div', { className: 'todo-time-custom' },
            h('strong', null, copy.customRange),
            h('div', { className: 'todo-time-inputs' },
              h('label', null, h('span', null, copy.startDate), h('input', { type: 'date', value: draftStart, max: draftEnd || undefined, onChange: (event) => setDraftStart(event.target.value) })),
              h('label', null, h('span', null, copy.endDate), h('input', { type: 'date', value: draftEnd, min: draftStart || undefined, onChange: (event) => setDraftEnd(event.target.value) }))),
            invalid ? h('p', { className: 'todo-time-error', role: 'alert' }, copy.invalidRange) : null,
            h('footer', null,
              h('button', { type: 'button', className: 'todo-time-clear', onClick: () => { setDraftStart(''); setDraftEnd(''); onChange(presetDateRange('all')); setOpen(false); } }, copy.clearRange),
              h('button', { type: 'button', className: 'todo-time-apply', disabled: invalid, onClick: () => { if (invalid) return; onChange(draftStart || draftEnd ? { key: 'custom', start: draftStart, end: draftEnd } : presetDateRange('all')); setOpen(false); } }, copy.applyRange)))) : null);
    }


    /* ---------------- date & time picker ---------------- */
    /* Two movements, in the order a person actually thinks:
       1) which DAY — a calendar, because a month grid is the fastest way to see "next Tuesday".
       2) what TIME — a scroll wheel, because chips force you to hunt for a number in a row
          and a wheel lands on it with one flick. Ranges get a second wheel pair. */

    const HOURS = Array.from({ length: 24 }, (_, index) => index);
    const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const WHEEL_ITEM = 34;

    function pad2(value) { return String(value).padStart(2, '0'); }

    /* Stable item arrays: a fresh array on every render would re-fire the Wheel's
       sync effect (which would fight the person's own scrolling). */
    const HOUR_ITEMS = HOURS.map((hour) => ({ value: pad2(hour), label: pad2(hour) }));
    const MINUTE_ITEMS = MINUTES.map((minute) => ({ value: pad2(minute), label: pad2(minute) }));

    function Wheel({ items, value, onChange, ariaLabel, snapTo }) {
      const nodeRef = React.useRef(null);
      const settle = React.useRef(0);
      const touched = React.useRef(0);
      const programmatic = React.useRef(0);
      const drag = React.useRef(null);
      const skipClick = React.useRef(0);
      const [active, setActive] = React.useState(() => Math.max(0, items.findIndex((item) => item.value === value)));

      /* Native scrolling inside a modal body is unreliable on Android WebView: the
         modal steals the pan and the wheel barely moves. So the wheel drives itself
         with pointer events and keeps its own scrollTop - one finger, one row. */
      function indexAt() {
        const node = nodeRef.current;
        if (!node) return active;
        return Math.max(0, Math.min(items.length - 1, Math.round(node.scrollTop / WHEEL_ITEM)));
      }

      function commit(index) {
        const item = items[index];
        setActive(index);
        if (item && item.value !== value) onChange(item.value);
      }

      function onPointerDown(event) {
        const node = nodeRef.current;
        if (!node) return;
        drag.current = { y: event.clientY, top: node.scrollTop, id: event.pointerId, moved: false };
        touched.current = Date.now();
        try { node.setPointerCapture(event.pointerId); } catch (error) { /* older engines */ }
      }

      function onPointerMove(event) {
        const node = nodeRef.current;
        const state = drag.current;
        if (!node || !state || event.pointerId !== state.id) return;
        const delta = state.y - event.clientY;
        if (Math.abs(delta) > 2) state.moved = true;
        node.scrollTop = state.top + delta;
        setActive(indexAt());
        touched.current = Date.now();
      }

      function onPointerUp(event) {
        const node = nodeRef.current;
        const state = drag.current;
        drag.current = null;
        if (!node || !state) return;
        if (!state.moved) return;
        const index = indexAt();
        node.scrollTop = index * WHEEL_ITEM;
        touched.current = Date.now();
        programmatic.current = Date.now();
        skipClick.current = Date.now();
        commit(index);
      }

      React.useEffect(() => {
        const index = Math.max(0, items.findIndex((item) => item.value === value));
        setActive(index);
        const node = nodeRef.current;
        if (node && Date.now() - touched.current > 400 && index >= 0) node.scrollTop = index * WHEEL_ITEM;
      }, [value, items]);

      React.useEffect(() => () => window.clearTimeout(settle.current), []);

      function handleScroll() {
        const node = nodeRef.current;
        if (!node) return;
        /* A tap-scroll is still animating: its scroll events are not the person's
           intent, so ignore them instead of writing a half-way value. */
        if (Date.now() - programmatic.current < 420) return;
        touched.current = Date.now();
        const index = Math.max(0, Math.min(items.length - 1, Math.round(node.scrollTop / WHEEL_ITEM)));
        setActive(index);
        window.clearTimeout(settle.current);
        settle.current = window.setTimeout(() => {
          const item = items[index];
          if (item && item.value !== value) onChange(item.value);
        }, 130);
      }

      function jump(index) {
        if (Date.now() - skipClick.current < 400) return;
        const item = items[index];
        touched.current = Date.now();
        programmatic.current = Date.now();
        setActive(index);
        const node = nodeRef.current;
        /* Jump instantly instead of smooth-scrolling: a smooth scroll emits a burst
           of scroll events and the last one can land on a neighbouring row. */
        if (node) node.scrollTop = index * WHEEL_ITEM;
        if (item && item.value !== value) onChange(item.value);
      }

      return h('div', { className: 'todo-wheel' },
        h('span', { className: 'todo-wheel-band', 'aria-hidden': true }),
        h('div', {
          className: 'todo-wheel-scroll',
          ref: nodeRef,
          onScroll: handleScroll,
          onPointerDown: onPointerDown,
          onPointerMove: onPointerMove,
          onPointerUp: onPointerUp,
          onPointerCancel: onPointerUp,
          role: 'listbox',
          tabIndex: 0,
          'aria-label': ariaLabel,
          'aria-activedescendant': undefined,
        },
          h('span', { className: 'todo-wheel-pad', 'aria-hidden': true }),
          items.map((item, index) => h('button', {
            key: item.value || `none-${index}`,
            type: 'button',
            role: 'option',
            'aria-selected': index === active,
            className: `todo-wheel-item${index === active ? ' is-active' : ''}`,
            onClick: () => jump(index),
          }, item.label)),
          h('span', { className: 'todo-wheel-pad', 'aria-hidden': true })));
    }

    function DateTimePicker({ value, end, repeat, locale, copy, onChange }) {
      const initial = parseDue(value);
      const [dayKey, setDayKey] = React.useState(() => (initial ? initial.key : ''));
      const [time, setTime] = React.useState(() => (initial ? initial.time : ''));
      const [endTime, setEndTime] = React.useState(() => end || '');
      const [recur, setRecur] = React.useState(() => repeat || '');
      const [cursor, setCursor] = React.useState(() => {
        const base = initial ? initial.date : new Date();
        return { y: base.getFullYear(), m: base.getMonth() };
      });

      const firstDay = new Date(cursor.y, cursor.m, 1);
      const startOffset = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
      const cells = [];
      for (let index = 0; index < startOffset; index += 1) cells.push(null);
      for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);

      const hourValue = time ? time.slice(0, 2) : '09';
      const minuteValue = time ? time.slice(3, 5) : '00';
      const endHourValue = endTime ? endTime.slice(0, 2) : '';
      const endMinuteValue = endTime ? endTime.slice(3, 5) : '00';
      const showTime = Boolean(time);
      const showEnd = Boolean(time && endTime);


      function emit(next) {
        const day = next.day !== undefined ? next.day : dayKey;
        const t = next.time !== undefined ? next.time : time;
        const e = next.end !== undefined ? next.end : endTime;
        const r = next.repeat !== undefined ? next.repeat : recur;
        const key = day || localTodayKey(0);
        onChange({ due: t ? `${key}T${t}` : day, end: t ? e : '', repeat: r });
      }

      function shiftBy(minutes) {
        const base = time ? Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5)) : 9 * 60;
        const next = Math.min(24 * 60 - 1, base + minutes);
        return `${pad2(Math.floor(next / 60))}:${pad2(next % 60)}`;
      }

      function setStart(next) {
        const previous = time;
        const nextEnd = endTime && endTime > next ? endTime : (endTime ? shiftBy(60) : '');
        setTime(next);
        if (endTime) setEndTime(nextEnd);
        emit({ time: next, end: endTime ? nextEnd : '', day: dayKey || localTodayKey(0) });
        if (!dayKey) setDayKey(localTodayKey(0));
        void previous;
      }

      function setEnd(next) {
        let value = next;
        if (time && value && value <= time) value = shiftBy(60);
        setEndTime(value);
        emit({ end: value, time });
      }

      function pickDay(day) {
        const next = localDateKey(new Date(cursor.y, cursor.m, day));
        setDayKey(next);
        emit({ day: next });
      }

      function pickQuick(offset) {
        const next = localTodayKey(offset);
        setDayKey(next);
        const base = new Date(`${next}T00:00:00`);
        setCursor({ y: base.getFullYear(), m: base.getMonth() });
        emit({ day: next });
      }

      function setMode(mode) {
        if (mode === 'allday') {
          setTime(''); setEndTime('');
          emit({ time: '', end: '', day: dayKey || localTodayKey(0) });
          if (!dayKey) setDayKey(localTodayKey(0));
          return;
        }
        const next = time || '09:00';
        setTime(next);
        if (!dayKey) setDayKey(localTodayKey(0));
        if (mode === 'range') {
          const nextEnd = endTime && endTime > next ? endTime : `${pad2(Math.min(23, Number(next.slice(0, 2)) + 1))}:${next.slice(3, 5)}`;
          setEndTime(nextEnd);
          emit({ day: dayKey || localTodayKey(0), time: next, end: nextEnd });
          return;
        }
        setEndTime('');
        emit({ day: dayKey || localTodayKey(0), time: next, end: '' });
      }

      function shiftMonth(delta) {
        const next = new Date(cursor.y, cursor.m + delta, 1);
        setCursor({ y: next.getFullYear(), m: next.getMonth() });
      }

      const monthTitle = isZh(locale) ? `${cursor.y} 年 ${cursor.m + 1} 月` : `${copy.monthNames[cursor.m]} ${cursor.y}`;
      const mode = !time ? 'allday' : (endTime ? 'range' : 'point');
      const preview = time
        ? `${formatDueChip(value || `${dayKey}T${time}`, locale, copy)}${endTime ? ` ${copy.rangeJoiner} ${endTime}` : ''}`
        : (dayKey ? formatDueChip(dayKey, locale, copy) : copy.noTimeLabel);

      return h('div', { className: 'todo-picker' },
        h('div', { className: 'todo-quick-row' },
          [[0, copy.todayQ], [1, copy.tomorrowQ], [2, copy.dayAfterQ], [null, copy.weekendQ], [null, copy.nextMondayQ]].map(([offset, label], index) => h('button', {
            key: label,
            type: 'button',
            className: 'todo-quick-chip',
            onClick: () => {
              if (index < 3) pickQuick(offset);
              else if (index === 3) {
                const todayMon = (new Date().getDay() + 6) % 7;
                let delta = 5 - todayMon;
                if (delta < 0) delta += 7;
                pickQuick(delta);
              } else {
                const todayMon = (new Date().getDay() + 6) % 7;
                let delta = 7 - todayMon;
                if (delta <= 0) delta += 7;
                pickQuick(delta);
              }
            },
          }, label))),
        h('div', { className: 'todo-cal-head' },
          h('button', { type: 'button', className: 'todo-cal-nav', onClick: () => shiftMonth(-1), 'aria-label': copy.monthPrev }, h(ChevronLeftIcon)),
          h('strong', null, monthTitle),
          h('button', { type: 'button', className: 'todo-cal-nav', onClick: () => shiftMonth(1), 'aria-label': copy.monthNext }, h(ChevronRightIcon))),
        h('div', { className: 'todo-cal-week' }, copy.weekdays.map((label) => h('span', { key: label }, label))),
        h('div', { className: 'todo-cal-grid' }, cells.map((day, index) => {
          if (!day) return h('span', { key: `blank-${index}`, className: 'todo-cal-blank' });
          const key = localDateKey(new Date(cursor.y, cursor.m, day));
          const isToday = key === localTodayKey(0);
          const isSelected = key === dayKey;
          const isPast = key < localTodayKey(0);
          return h('button', {
            key,
            type: 'button',
            className: `todo-cal-day${isSelected ? ' is-selected' : ''}${isToday ? ' is-today' : ''}${isPast ? ' is-past' : ''}`,
            onClick: () => pickDay(day),
          }, String(day));
        })),
        h('div', { className: 'todo-picker-time' },
          h('div', { className: 'todo-picker-time-head' },
            h('strong', null, copy.time),
            h('div', { className: 'todo-mode-switch' },
              [['allday', copy.allDay], ['point', copy.startTime], ['range', copy.startTime + copy.rangeJoiner + copy.endTime]].map(([value, label]) => h('button', {
                key: value,
                type: 'button',
                className: mode === value ? 'is-active' : '',
                onClick: () => setMode(value),
              }, label)))),
          showTime ? h('div', { className: 'todo-wheel-line' },
            h('span', { className: 'todo-wheel-label' }, copy.startTime),
            h(Wheel, {
              items: HOUR_ITEMS,
              value: hourValue,
              ariaLabel: copy.hour,
              onChange: (next) => setStart(`${next}:${minuteValue}`),
            }),
            h('b', { className: 'todo-wheel-colon', 'aria-hidden': true }, ':'),
            h(Wheel, {
              items: MINUTE_ITEMS,
              value: minuteValue,
              ariaLabel: copy.minute,
              onChange: (next) => setStart(`${hourValue}:${next}`),
            })) : null,
          showEnd ? h('div', { className: 'todo-wheel-line' },
            h('span', { className: 'todo-wheel-label' }, copy.endTime),
            h(Wheel, {
              items: HOUR_ITEMS,
              value: endHourValue || '10',
              ariaLabel: copy.hour,
              onChange: (next) => setEnd(`${next}:${endMinuteValue}`),
            }),
            h('b', { className: 'todo-wheel-colon', 'aria-hidden': true }, ':'),
            h(Wheel, {
              items: MINUTE_ITEMS,
              value: endMinuteValue,
              ariaLabel: copy.minute,
              onChange: (next) => setEnd(`${endHourValue || '10'}:${next}`),
            }),
            h('button', {
              type: 'button',
              className: 'todo-wheel-clear',
              'aria-label': copy.noEnd,
              title: copy.noEnd,
              onClick: () => setEnd(''),
            }, '\u00d7')) : null,
          h('div', { className: 'todo-repeat-row' },
            h('span', { className: 'todo-repeat-label' }, copy.repeat),
            [['', copy.repeatNone], ['daily', copy.repeatDaily], ['weekday', copy.repeatWeekday], ['weekly', copy.repeatWeekly], ['monthly', copy.repeatMonthly]].map(([value, label]) => h('button', {
              key: value || 'none',
              type: 'button',
              className: `todo-repeat-chip${recur === value ? ' is-active' : ''}`,
              onClick: () => { setRecur(value); emit({ repeat: value }); },
            }, label)))),
        h('div', { className: 'todo-picker-foot' },
          h('button', { type: 'button', className: 'todo-link-btn', onClick: () => { setTime(''); setEndTime(''); setDayKey(''); setRecur(''); onChange({ due: '', end: '', repeat: '' }); } }, copy.clearTime),
          h('span', { className: 'todo-picker-preview' }, preview)));
    }

    /* ---------------- note card ---------------- */

    function repeatText(value, copy, locale) {
      if (!value) return '';
      if (value === 'daily') return isZh(locale) ? '每天' : 'Daily';
      if (value === 'weekday') return copy.repeatWeekday;
      if (value === 'weekly') return copy.repeatWeekly;
      if (value === 'monthly') return copy.repeatMonthly;
      if (value.indexOf('weekly:') === 0) {
        const day = Number(value.split(':')[1]);
        const names = isZh(locale) ? WEEKDAYS_ZH : WEEKDAYS_EN;
        return isZh(locale) ? '每' + names[day] : 'Every ' + names[day];
      }
      if (value.indexOf('monthly:') === 0) {
        return isZh(locale) ? '每月 ' + value.split(':')[1] + ' 日' : 'Monthly day ' + value.split(':')[1];
      }
      return '';
    }

    function NoteCard({ todo, copy, locale, index, onEdit, onToggle }) {
      const info = parseDue(todo.due);
      const overdue = todo.status === 'pending' && Boolean(todo.due) && (todo.due.length > 10 ? new Date(todo.due).getTime() : new Date(`${todo.due}T23:59`).getTime()) < Date.now();
      const tilt = ((Math.abs(todo.id.split('').reduce((sum, letter) => sum + letter.charCodeAt(0), 0)) % 7) - 3) * 0.22;
      const done = todo.status === 'completed';
      const [popping, setPopping] = React.useState(false);

      function handleToggle(event) {
        event.stopPropagation();
        setPopping(true);
        window.setTimeout(() => setPopping(false), 420);
        onToggle(todo);
      }

      return h('article', {
        className: `todo-note color-${todo.color} status-${todo.status}${overdue ? ' is-overdue' : ''}${popping ? ' is-popping' : ''}`,
        style: { '--todo-tilt': `${tilt}deg`, '--todo-enter-delay': `${Math.min(index, 8) * 38}ms` },
        tabIndex: 0,
        role: 'button',
        onClick: () => onEdit(todo),
        onKeyDown: (event) => { if (event.target !== event.currentTarget) return; if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onEdit(todo); } },
      },
        h('span', { className: 'todo-note-pin', 'aria-hidden': true }),
        h('div', { className: 'todo-note-heading' },
          h('button', {
            type: 'button',
            className: `todo-status-light status-${todo.status}`,
            onClick: handleToggle,
            'aria-label': done ? copy.markPending : copy.markCompleted,
          }, h('span', { className: 'todo-status-dot', 'aria-hidden': true }, h('svg', { viewBox: '0 0 24 24', width: 12, height: 12, 'aria-hidden': true }, h('path', { d: 'M4.5 12.5l5 5L20 6.5', fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' })))),
          h('h3', null, h('span', { className: 'todo-note-text' }, todo.title))),
        (todo.location || info) ? h('div', { className: 'todo-note-details' },
          todo.location ? h('div', { className: 'todo-note-detail' }, h(LocationIcon), h('span', null, todo.location)) : null,
          info ? h('div', { className: `todo-note-detail todo-note-time${overdue ? ' is-overdue' : ''}` },
            h(ClockIcon),
            h('span', null, `${formatDueChip(todo.due, locale, copy)}${todo.end ? ` ${copy.rangeJoiner} ${todo.end}` : ''}`),
            overdue ? h('em', null, copy.overdue) : null) : null) : null,
        todo.repeat ? h('div', { className: 'todo-note-repeat' }, repeatText(todo.repeat, copy, locale)) : null,
        h('span', { className: 'todo-note-ring', 'aria-hidden': true }));
    }

    /* ---------------- toast ---------------- */

    function Toast({ message }) {
      return h('div', { className: 'todo-toast', role: 'status', 'aria-live': 'polite' }, h(CheckIcon), h('span', null, message));
    }

    /* ---------------- modal ---------------- */

    function useVoice(copy) {
      const [supported, setSupported] = React.useState(false);
      const [listening, setListening] = React.useState(false);
      const recRef = React.useRef(null);

      React.useEffect(() => {
        const Api = window.SpeechRecognition || window.webkitSpeechRecognition;
        setSupported(typeof Api === 'function');
      }, []);

      function start(onText) {
        const Api = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (typeof Api !== 'function') return;
        try {
          const rec = new Api();
          rec.lang = isZh(navigator.language) ? 'zh-CN' : 'en-US';
          rec.interimResults = false;
          rec.maxAlternatives = 1;
          rec.onresult = (event) => {
            const value = event.results && event.results[0] && event.results[0][0] ? event.results[0][0].transcript : '';
            if (value) onText(value);
          };
          rec.onend = () => setListening(false);
          rec.onerror = () => setListening(false);
          recRef.current = rec;
          setListening(true);
          rec.start();
        } catch {
          setListening(false);
        }
      }

      return { supported, listening, start };
    }

    function Modal({ mode, todo, copy, locale, knownPlaces, onClose, onCreate }) {
      const isEdit = mode === 'edit' && todo;
      const [raw, setRaw] = React.useState(isEdit ? todo.title : '');
      const [title, setTitle] = React.useState(isEdit ? todo.title : '');
      const [location, setLocation] = React.useState(isEdit ? todo.location : '');
      const [due, setDue] = React.useState(isEdit ? todo.due : '');
      const [end, setEnd] = React.useState(isEdit ? (todo.end || '') : '');
      const [repeat, setRepeat] = React.useState(isEdit ? (todo.repeat || '') : '');
      const [color, setColor] = React.useState(isEdit ? todo.color : NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)]);
      const [confirmDelete, setConfirmDelete] = React.useState(false);
      const [showMore, setShowMore] = React.useState(false);
      const [showPicker, setShowPicker] = React.useState(false);
      const [plan, setPlan] = React.useState([]);
      const [shake, setShake] = React.useState(false);
      const [showPlan, setShowPlan] = React.useState(false);
      const touched = React.useRef({ title: Boolean(isEdit), due: Boolean(isEdit), location: Boolean(isEdit) });
      const inputRef = React.useRef(null);
      const voice = useVoice(copy);

      React.useEffect(() => {
        const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKeyDown);
        const timer = window.setTimeout(() => { if (inputRef.current && !isEdit) inputRef.current.focus(); }, 180);
        return () => { window.removeEventListener('keydown', onKeyDown); window.clearTimeout(timer); };
      }, [onClose, isEdit]);

      function applyParse(text) {
        const parsed = planSmart(text, undefined, knownPlaces);
        setPlan(parsed);
        const first = parsed[0];
        if (!first) { if (!touched.current.title) setTitle(text.trim()); return; }
        if (!touched.current.title) setTitle(first.title || text.trim());
        if (!touched.current.due) setDue(first.due);
        if (!touched.current.due) { setEnd(first.end || ''); setRepeat(first.repeat || ''); }
        if (!touched.current.location) setLocation(first.location);
      }

      function handleRaw(event) {
        const text = event.target.value;
        setRaw(text);
        /* Typing refines the title and place, but a time the person picked in the
           calendar/wheels must survive further typing — otherwise the picker's work
           is wiped the moment they type the task name. */
        touched.current = { title: false, due: Boolean(touched.current.due), location: false };
        applyParse(text);
      }

      function submit(event) {
        if (event) event.preventDefault();
        const cleanTitle = (title || raw).trim();
        if (!cleanTitle) {
          setShake(true);
          window.setTimeout(() => setShake(false), 520);
          if (inputRef.current) inputRef.current.focus();
          return;
        }
        const now = Date.now();
        if (isEdit) {
          setTodos((items) => items.map((item) => item.id === todo.id ? { ...item, title: cleanTitle, location: location.trim(), due: normalizeDue(due), end: normalizeEnd(end), repeat: normalizeRepeat(repeat), color, updatedAt: now } : item));
          onClose(copy.toastUpdated);
          return;
        }
        if (plan.length > 1) {
          const created = plan.map((item) => ({
            id: todoId(),
            title: (item.title || cleanTitle).trim(),
            location: (item.location || '').trim(),
            due: normalizeDue(item.due || ''),
            end: normalizeEnd(item.end || end),
            repeat: normalizeRepeat(item.repeat || repeat),
            status: 'pending',
            color,
            createdAt: now,
            updatedAt: now,
          })).filter((item) => item.title);
          if (created.length > 0) {
            setTodos((items) => [...created, ...items]);
            onClose(copy.toastAdded);
            return;
          }
        }
        onCreate({
          id: todoId(),
          title: cleanTitle,
          location: location.trim(),
          due: normalizeDue(due),
          end: normalizeEnd(end),
          repeat: normalizeRepeat(repeat),
          status: 'pending',
          color,
          createdAt: now,
          updatedAt: now,
        });
        onClose(copy.toastAdded);
      }

      function remove() {
        if (!isEdit) return;
        if (!confirmDelete) { setConfirmDelete(true); return; }
        setTodos((items) => items.filter((item) => item.id !== todo.id));
        onClose(copy.toastDeleted);
      }

      function toggleStatus() {
        if (!isEdit) return;
        const next = todo.status === 'pending' ? 'completed' : 'pending';
        setTodos((items) => items.map((item) => item.id === todo.id ? { ...item, status: next, updatedAt: Date.now() } : item));
        onClose(next === 'completed' ? copy.toastDone : copy.toastBack);
      }

      const detected = Boolean(due || location);
      const timeLabel = due ? formatDueChip(due, locale, copy) : copy.noTimeLabel || copy.allDay;
      function repeatLabel(value) {
        if (!value) return '';
        if (value === 'daily') return copy.repeatDaily;
        if (value === 'weekday') return copy.repeatWeekday;
        if (value === 'weekly') return copy.repeatWeekly;
        if (value === 'monthly') return copy.repeatMonthly;
        if (value.indexOf('weekly:') === 0) {
          const day = Number(value.split(':')[1]);
          const names = isZh(locale) ? WEEKDAYS_ZH : WEEKDAYS_EN;
          return isZh(locale) ? '每' + names[day] : 'Every ' + names[day];
        }
        if (value.indexOf('monthly:') === 0) return isZh(locale) ? '每月 ' + value.split(':')[1] + ' 日' : 'Monthly day ' + value.split(':')[1];
        return '';
      }

      return h('div', {
        className: 'todo-modal-backdrop',
        onMouseDown: (event) => { if (event.target === event.currentTarget) onClose(); },
      },
        h('section', { className: 'todo-modal', role: 'dialog', 'aria-modal': true, 'aria-label': isEdit ? copy.editTitle : copy.addTitle },
          h('header', { className: 'todo-modal-head' },
            h('div', null, h('span', { className: `todo-paper-dot color-${color}` }), h('h2', null, isEdit ? copy.editTitle : copy.addTitle)),
            h('button', { type: 'button', className: 'todo-modal-close', onClick: () => onClose(), 'aria-label': copy.close }, h(CloseIcon))),
          h('div', { className: 'todo-modal-body' },
            h('div', { className: `todo-smart${shake ? ' is-shaking' : ''}` },
              h('label', { className: 'todo-smart-label', htmlFor: 'todo-smart-input' }, h('span', null, copy.smartLabel)),
              h('div', { className: 'todo-smart-box' },
                h('input', {
                  id: 'todo-smart-input',
                  ref: inputRef,
                  className: 'todo-smart-input',
                  value: raw,
                  onChange: handleRaw,
                  placeholder: copy.smartPlaceholder,
                  enterKeyHint: 'done',
                  onKeyDown: (event) => { if (event.key === 'Enter') { event.preventDefault(); submit(); } },
                }),
                voice.supported ? h('button', {
                  type: 'button',
                  className: `todo-voice-btn${voice.listening ? ' is-listening' : ''}`,
                  onClick: () => voice.start((text) => { setRaw(text); touched.current = { title: false, due: false, location: false }; applyParse(text); }),
                  'aria-label': copy.smartVoice,
                }, h(MicIcon)) : null),
              h('p', { className: 'todo-smart-hint' }, h('span', { className: 'todo-smart-spark', 'aria-hidden': true }), detected ? copy.smartHint : copy.smartHint)),
            (due || location || plan.length > 1) ? h('div', { className: 'todo-detected' },
              due ? h('button', {
                type: 'button',
                className: 'todo-chip todo-chip-time',
                onClick: () => setShowPicker(true),
              }, h(ClockIcon), h('span', null, timeLabel), h('b', { className: 'todo-chip-x', onClick: (event) => { event.stopPropagation(); touched.current.due = true; setDue(''); } }, '×')) : null,
              location ? h('span', { className: 'todo-chip todo-chip-place' },
                h(LocationIcon), h('span', null, location),
                h('b', { className: 'todo-chip-x', onClick: () => { touched.current.location = true; setLocation(''); } }, '×')) : null,
              repeat ? h('span', { className: 'todo-chip todo-chip-repeat' },
                h('span', null, repeatLabel(repeat)),
                h('b', { className: 'todo-chip-x', onClick: () => setRepeat('') }, '×')) : null,
              plan.length > 1 ? h('button', {
                type: 'button',
                className: `todo-chip todo-chip-multi${showPlan ? ' is-open' : ''}`,
                onClick: () => setShowPlan((value) => !value),
                'aria-expanded': showPlan,
              }, h('span', null, copy.tasksFound.replace('{count}', String(plan.length)))) : null) : null,
            plan.length > 1 && showPlan ? h('ol', { className: 'todo-plan-list' }, plan.map((item, index) => h('li', { key: `${item.title}-${index}` },
              h('span', { className: 'todo-plan-title' }, item.title || '—'),
              item.location ? h('em', null, item.location) : null,
              item.due ? h('em', null, formatDueChip(item.due, locale, copy)) : null))) : null,
            showPicker ? h(DateTimePicker, {
              value: due,
              end,
              repeat,
              locale,
              copy,
              onChange: (next) => {
                touched.current.due = true;
                setDue(next.due);
                setEnd(next.end || '');
                if (next.repeat !== undefined) setRepeat(next.repeat || '');
              },
            }) : null,
            !showPicker ? h('button', { type: 'button', className: 'todo-time-row', onClick: () => setShowPicker(true) },
              h('span', { className: 'todo-time-row-icon' }, h(CalendarIcon)),
              h('span', { className: 'todo-time-row-text' },
                h('strong', null, due ? formatDueChip(due, locale, copy) : copy.pickTime),
                h('em', null, due ? (end ? `${copy.rangeJoiner} ${end}` : (due.length > 10 ? copy.chipTime : copy.allDay)) : copy.optional)),
              h(ChevronRightIcon)) : null,
            h('button', { type: 'button', className: 'todo-more-toggle', onClick: () => setShowMore((value) => !value) },
              h('span', null, showMore ? copy.fewerOptions : copy.moreOptions),
              h('b', { className: `todo-more-caret${showMore ? ' is-open' : ''}`, 'aria-hidden': true }, '▾')),
            showMore ? h('div', { className: 'todo-more-panel' },
              h('label', { className: 'todo-field' }, h('span', null, copy.titleLabel),
                h('input', { value: title, onChange: (event) => { touched.current.title = true; setTitle(event.target.value); }, placeholder: copy.titlePlaceholder })),
              h('label', { className: 'todo-field' }, h('span', null, copy.location),
                h('input', { value: location, onChange: (event) => { touched.current.location = true; setLocation(event.target.value); }, placeholder: copy.locationPlaceholder })),
              h('fieldset', null,
                h('legend', null, copy.color),
                h('div', { className: 'todo-color-picker' }, NOTE_COLORS.map((value) => h('button', {
                  key: value,
                  type: 'button',
                  className: `color-${value}${color === value ? ' is-selected' : ''}`,
                  onClick: () => setColor(value),
                  'aria-label': value,
                }, color === value ? h('span', { className: 'todo-swatch-check' }, h(CheckIcon)) : null))))) : null),
          h('footer', { className: 'todo-modal-foot' },
            isEdit ? h('button', { type: 'button', className: `todo-danger${confirmDelete ? ' is-confirming' : ''}`, onClick: remove }, h(TrashIcon), confirmDelete ? copy.confirmRemove : copy.remove) : h('span', { className: 'todo-foot-hint' }, copy.smartHint),
            h('div', { className: 'todo-foot-actions' },
              isEdit ? h('button', { type: 'button', className: 'todo-secondary', onClick: toggleStatus }, todo.status === 'pending' ? copy.markCompleted : copy.markPending) : null,
              h('button', { type: 'button', className: 'todo-secondary', onClick: () => onClose() }, copy.cancel),
              h('button', { type: 'button', className: 'todo-primary', onClick: submit },
                h(PlusIcon), h('span', null, plan.length > 1 && !isEdit ? copy.expandAll.replace('{count}', '') : (isEdit ? copy.save : copy.create)))))));
    }

    /* ---------------- panel ---------------- */

    function TodoPanel({ runtime }) {
      const copy = useCopy(runtime);
      const locale = runtime.locale.getSnapshot().active;
      const todos = useTodos();
      const [query, setQuery] = React.useState('');
      const [filter, setFilter] = React.useState('all');
      const [timeRange, setTimeRange] = React.useState(() => presetDateRange('all'));
      const [modal, setModal] = React.useState(null);
      const [toast, setToast] = React.useState('');
      const toastTimer = React.useRef(0);
      const word = query.trim().toLowerCase();
      const visible = todos.filter((item) =>
        (filter === 'all' || item.status === filter)
        && matchesDateRange(item, timeRange)
        && (!word || item.title.toLowerCase().includes(word) || item.location.toLowerCase().includes(word)));
      const groups = groupTodos(visible);
      const pending = todos.filter((item) => item.status === 'pending').length;
      const done = todos.length - pending;
      const progress = todos.length ? Math.round((done / todos.length) * 100) : 0;
      const empty = todos.length === 0;
      const noResults = !empty && visible.length === 0;

      React.useEffect(() => () => window.clearTimeout(toastTimer.current), []);

      function flash(message) {
        setToast(message);
        window.clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => setToast(''), 1900);
      }

      function closeModal(message) {
        setModal(null);
        if (message) flash(message);
      }

      /* Places this person actually uses, learned from their own notes. The parser
         scores a captured "在X" against these and also recognises them without 在. */
      const knownPlaces = [];
      const seen = {};
      todos.forEach((item) => {
        const value = (item.location || '').trim();
        if (!value || seen[value]) return;
        seen[value] = true;
        knownPlaces.push(value);
      });

      function createTodo(item) {
        setTodos((items) => [item, ...items]);
      }

      function toggleTodo(todo) {
        const next = todo.status === 'pending' ? 'completed' : 'pending';
        setTodos((items) => items.map((item) => item.id === todo.id ? { ...item, status: next, updatedAt: Date.now() } : item));
        flash(next === 'completed' ? copy.toastDone : copy.toastBack);
      }

      return h('div', { className: 'todo-page' },
        h('style', null, CSS),
        h('header', { className: 'todo-header' },
          h('div', { className: 'todo-heading' },
            h('h1', null, copy.title),
            h('p', null, copy.subtitle)),
          h('div', { className: 'todo-header-actions' },
            h('span', { className: 'todo-pending-chip' },
              h('span', { className: 'todo-pending-dot', 'aria-hidden': true }),
              copy.pendingCount.replace('{count}', String(pending))),
            h('div', { className: 'todo-search' },
              h(SearchIcon),
              h('input', { value: query, onChange: (event) => setQuery(event.target.value), placeholder: copy.search, 'aria-label': copy.search }),
              query ? h('button', { type: 'button', onClick: () => setQuery(''), 'aria-label': copy.close }, h(CloseIcon)) : null),
            h(TimeRangeFilter, { value: timeRange, copy, onChange: setTimeRange }),
            h('div', { className: 'todo-filters' }, [['all', copy.all], ['pending', copy.pending], ['completed', copy.completed]].map(([value, label]) => h('button', {
              key: value,
              type: 'button',
              className: filter === value ? 'is-active' : '',
              onClick: () => setFilter(value),
            }, label)))),
          todos.length ? h('div', { className: 'todo-progress', 'aria-hidden': true }, h('span', { style: { width: `${progress}%` } })) : null),
        h('main', { className: 'todo-wall', 'aria-live': 'polite' },
          empty || noResults ? h('section', { className: 'todo-empty' },
            h('div', { className: 'todo-empty-note' },
              h('span', { className: 'todo-empty-plus' }, '+'),
              h('strong', null, noResults ? copy.noResultsTitle : copy.emptyTitle)),
            h('p', null, noResults ? copy.noResultsBody : copy.emptyBody)) :
            groups.map((group) => h('section', { className: 'todo-date-group', key: group.key || 'unscheduled' },
              h('header', null,
                h('h2', null, formatGroupDate(group.key, locale, copy)),
                h('span', { className: 'todo-group-count' }, group.todos.length)),
              h('div', { className: 'todo-note-grid' }, group.todos.map((todo, index) => h(NoteCard, {
                key: todo.id,
                todo,
                copy,
                locale,
                index,
                onEdit: (item) => setModal({ mode: 'edit', todo: item }),
                onToggle: toggleTodo,
              })))))),
        h('button', { type: 'button', className: 'todo-fab', onClick: () => setModal({ mode: 'create', todo: null }), 'aria-label': copy.addTitle },
          h('span', { className: 'todo-fab-ring', 'aria-hidden': true }),
          h(PlusIcon)),
        modal ? h(Modal, {
          key: modal.todo ? modal.todo.id : 'create',
          mode: modal.mode,
          todo: modal.todo,
          copy,
          locale,
          knownPlaces,
          onCreate: createTodo,
          onClose: closeModal,
        }) : null,
        toast ? h(Toast, { message: toast }) : null);
    }

    /* ---------------- icons / nav ---------------- */

    function PanelIcon(props) {
      const todos = useTodos();
      const pending = todos.filter((item) => item.status === 'pending').length;
      const size = props && props.size ? props.size : 22;
      const active = Boolean(props && props.active);
      return h(React.Fragment, null,
        h('style', null, ICON_CSS),
        h('span', { className: 'todo-nav-icon' },
          h('span', { className: `todo-nav-glyph${active ? ' is-active' : ''}` },
            h('svg', { viewBox: '0 0 24 24', width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true },
              h('rect', { x: 4.6, y: 4.2, width: 14.8, height: 15.6, rx: 3.4 }),
              h('path', { d: 'M8.5 9.8l1.6 1.6 2.9-3.1' }),
              h('path', { d: 'M8.5 15.6h7' }))),
          pending > 0 ? h('span', { className: 'todo-nav-badge', 'aria-label': `${pending}` }, pending > 99 ? '99+' : String(pending)) : null));
    }

    /* ---------------- styles ---------------- */

    const ICON_CSS = `
      @keyframes todo-badge-breathe{0%,100%{box-shadow:0 0 0 0 rgba(232,78,91,.45)}50%{box-shadow:0 0 0 5px rgba(232,78,91,0)}}
      button:has(.todo-nav-icon),[role=button]:has(.todo-nav-icon){position:relative!important;padding-right:50px!important}
      .todo-nav-icon{position:static;display:grid;place-items:center}
      .todo-nav-glyph{display:grid;place-items:center;transition:transform .22s cubic-bezier(.34,1.56,.64,1)}
      .todo-nav-glyph.is-active{transform:scale(1.06)}
      .todo-nav-badge{position:absolute;right:15px;top:50%;transform:translateY(-50%);display:grid;place-items:center;min-width:21px;height:21px;box-sizing:border-box;padding:0 4px;border:2px solid var(--dsw-alias-bg-layer-1);border-radius:999px;background:#e84e5b;color:#fff;font:700 10px/1 system-ui;animation:todo-badge-breathe 2.4s ease-in-out infinite}
      .todo-nav-label-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
    `;

    const CSS = `
      @keyframes todo-fade-in{from{opacity:0}to{opacity:1}}
      @keyframes todo-sheet-in{from{opacity:0;transform:translateY(26px) scale(.985)}to{opacity:1;transform:none}}
      @keyframes todo-note-in{from{opacity:0;transform:translateY(14px) rotate(var(--todo-tilt,-.4deg))}to{opacity:1;transform:rotate(var(--todo-tilt,-.4deg))}}
      @keyframes todo-pop{0%{transform:rotate(var(--todo-tilt,0deg)) scale(1)}38%{transform:rotate(var(--todo-tilt,0deg)) scale(1.055)}100%{transform:rotate(var(--todo-tilt,0deg)) scale(1)}}
      @keyframes todo-check-draw{from{stroke-dashoffset:22}to{stroke-dashoffset:0}}
      @keyframes todo-fab-ring{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.55);opacity:0}}
      @keyframes todo-shake{0%,100%{transform:translateX(0)}18%{transform:translateX(-7px)}38%{transform:translateX(6px)}58%{transform:translateX(-4px)}78%{transform:translateX(3px)}}
      @keyframes todo-toast-in{from{opacity:0;transform:translate(-50%,14px) scale(.96)}to{opacity:1;transform:translate(-50%,0) scale(1)}}
      @keyframes todo-chip-in{from{opacity:0;transform:translateY(-5px) scale(.94)}to{opacity:1;transform:none}}
      @keyframes todo-spark{0%,100%{opacity:.55;transform:scale(.92)}50%{opacity:1;transform:scale(1.06)}}
      @keyframes todo-dot-breathe{0%,100%{box-shadow:0 0 0 0 rgba(242,157,54,.55)}50%{box-shadow:0 0 0 6px rgba(242,157,54,0)}}

      .todo-page{
        position:relative;height:100%;min-height:0;overflow:auto;overscroll-behavior:contain;
        background:var(--dsh-dream-skin-page-fill,var(--dsw-alias-bg-base));
        color:var(--dsw-alias-label-primary);font-family:inherit;
        -webkit-tap-highlight-color:transparent;
      }
      .todo-page *{box-sizing:border-box}

      /* ---------- header ---------- */
      .todo-header{position:sticky;top:0;z-index:8;display:flex;align-items:center;gap:18px 24px;flex-wrap:wrap;padding:22px 30px 16px;border-bottom:1px solid var(--dsw-alias-border-l1);background:color-mix(in srgb,var(--dsh-dream-skin-page-fill,var(--dsw-alias-bg-base)) 88%,transparent);backdrop-filter:blur(20px) saturate(1.3)}
      .todo-heading{min-width:0;flex:1 1 210px}
      .todo-heading h1{margin:0;font-size:29px;line-height:1.06;letter-spacing:-.045em;font-weight:760}
      .todo-heading p{margin:7px 0 0;color:var(--dsw-alias-label-secondary);font-size:12.5px;letter-spacing:.005em}
      .todo-header-actions{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
      .todo-progress{position:absolute;left:0;right:0;bottom:-1px;height:2px;overflow:hidden;background:transparent}
      .todo-progress span{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#37b575,#4bc48c);transition:width .55s cubic-bezier(.22,1,.36,1)}

      .todo-pending-chip{display:inline-flex;align-items:center;gap:7px;white-space:nowrap;padding:7px 12px;border-radius:999px;background:color-mix(in srgb,#f29d36 13%,var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-label-secondary);font-size:11.5px;font-weight:650}
      .todo-pending-dot{width:6px;height:6px;border-radius:50%;background:#f29d36;animation:todo-dot-breathe 2.6s ease-in-out infinite}

      .todo-search{display:flex;align-items:center;gap:7px;width:206px;height:35px;padding:0 9px;border:1px solid var(--dsw-alias-border-l1);border-radius:11px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);transition:border-color .18s ease,background .18s ease}
      .todo-search:focus-within{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 55%,var(--dsw-alias-border-l1));background:var(--dsw-alias-bg-layer-2)}
      .todo-search input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px}
      .todo-search button{display:grid;place-items:center;width:22px;height:22px;padding:0;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
      .todo-search button:hover{background:var(--dsw-alias-bg-layer-3,var(--dsw-alias-bg-layer-2))}

      .todo-time-filter{position:relative}
      .todo-time-trigger{display:flex;align-items:center;gap:7px;max-width:186px;height:35px;padding:0 11px;border:1px solid var(--dsw-alias-border-l1);border-radius:11px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;cursor:pointer;transition:border-color .18s ease,background .18s ease}
      .todo-time-trigger>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .todo-time-trigger.is-active{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 48%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 10%,var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-label-primary);font-weight:700}
      .todo-time-popover{position:absolute;top:calc(100% + 9px);right:0;z-index:20;width:338px;padding:13px;border:1px solid var(--dsw-alias-border-l1);border-radius:14px;background:var(--dsw-alias-bg-layer-1);box-shadow:0 22px 54px color-mix(in srgb,#000 24%,transparent);animation:todo-sheet-in .2s cubic-bezier(.22,1,.36,1) both;transform-origin:top right}
      .todo-time-quick{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
      .todo-time-quick button{min-height:34px;padding:6px 6px;border:1px solid var(--dsw-alias-border-l1);border-radius:9px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;cursor:pointer;transition:transform .14s ease,background .14s ease,color .14s ease}
      .todo-time-quick button:active{transform:scale(.96)}
      .todo-time-quick button:hover,.todo-time-quick button.is-active{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 45%,var(--dsw-alias-border-l1));background:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 11%,var(--dsw-alias-bg-layer-2));color:var(--dsw-alias-label-primary)}
      .todo-time-custom{margin-top:12px;padding-top:12px;border-top:1px solid var(--dsw-alias-border-l1)}
      .todo-time-custom>strong{display:block;margin-bottom:9px;font-size:11.5px}
      .todo-time-inputs{display:grid;grid-template-columns:1fr 1fr;gap:9px}
      .todo-time-inputs label{display:flex;min-width:0;flex-direction:column;gap:5px;color:var(--dsw-alias-label-secondary);font-size:10px;font-weight:650}
      .todo-time-inputs input{width:100%;height:36px;padding:0 8px;border:1px solid var(--dsw-alias-border-l1);border-radius:9px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;font-size:11px;color-scheme:light dark}
      .todo-time-error{margin:8px 0 0;color:#d0525e;font-size:10.5px}
      .todo-time-custom footer{display:flex;align-items:center;justify-content:space-between;margin-top:11px}
      .todo-time-clear,.todo-time-apply{height:32px;padding:0 13px;border-radius:9px;font:inherit;font-size:11px;font-weight:650;cursor:pointer}
      .todo-time-clear{border:0;background:transparent;color:var(--dsw-alias-label-secondary)}
      .todo-time-apply{border:0;background:var(--dsw-alias-button-primary-fill,var(--dsw-alias-brand-primary,#5068ee));color:#fff}
      .todo-time-apply:disabled{cursor:not-allowed;opacity:.45}

      .todo-filters{display:flex;gap:2px;padding:3px;border:1px solid var(--dsw-alias-border-l1);border-radius:11px;background:var(--dsw-alias-bg-layer-1)}
      .todo-filters button{height:29px;padding:0 11px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;cursor:pointer;transition:background .16s ease,color .16s ease,transform .12s ease}
      .todo-filters button:active{transform:scale(.96)}
      .todo-filters button.is-active{background:var(--dsw-alias-bg-layer-3,var(--dsw-alias-bg-layer-2));color:var(--dsw-alias-label-primary);font-weight:700;box-shadow:0 1px 2px color-mix(in srgb,var(--dsw-alias-label-primary) 8%,transparent)}

      /* ---------- wall ---------- */
      .todo-wall{width:min(1040px,calc(100% - 60px));margin:0 auto;padding:28px 0 108px}
      .todo-date-group{margin-bottom:29px}
      .todo-date-group>header{display:flex;align-items:center;gap:9px;margin-bottom:14px;border-bottom:1px solid var(--dsw-alias-border-l1)}
      .todo-date-group h2{margin:0 0 -1px;padding:0 2px 9px;border-bottom:2px solid color-mix(in srgb,var(--dsw-alias-label-primary) 55%,transparent);font-size:13.5px;font-weight:680;letter-spacing:.005em}
      .todo-group-count{display:grid;place-items:center;min-width:18px;height:18px;padding:0 5px;margin-bottom:10px;border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-label-primary) 6%,transparent);color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-size:9.5px;font-weight:700}

      .todo-note-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px 18px;padding:2px 2px 0}

      .todo-note{
        --paper:#FFE7A3;--paper-edge:color-mix(in srgb,#8a6a1f 26%,transparent);
        position:relative;display:flex;min-height:128px;flex-direction:column;justify-content:flex-start;
        padding:17px 17px 15px;border:1px solid color-mix(in srgb,#6b5a20 14%,transparent);border-radius:13px;
        background:
          linear-gradient(166deg,color-mix(in srgb,#fff 46%,var(--paper)) 0%,var(--paper) 46%,color-mix(in srgb,#000 4%,var(--paper)) 100%);
        color:#343743;cursor:pointer;overflow:hidden;
        transform:rotate(var(--todo-tilt,-.4deg));
        box-shadow:0 8px 20px color-mix(in srgb,#3a2f12 15%,transparent),0 1px 0 rgba(255,255,255,.6) inset;
        transition:transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s ease,opacity .22s ease,filter .22s ease;
        animation:todo-note-in .34s cubic-bezier(.22,1,.36,1) backwards;animation-delay:var(--todo-enter-delay,0ms);
      }
      .todo-note:active{transform:scale(.984) rotate(0)}
      .todo-note:hover,.todo-note:focus-visible{transform:translateY(-4px) rotate(0);box-shadow:0 16px 30px color-mix(in srgb,#3a2f12 22%,transparent),0 1px 0 rgba(255,255,255,.6) inset;outline:none;z-index:2}
      .todo-note-pin{position:absolute;right:13px;top:11px;width:16px;height:5px;border-radius:3px;background:color-mix(in srgb,#6b5a20 22%,transparent);transform:rotate(-14deg)}
      .todo-note-ring{position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 0 0 rgba(255,255,255,0);transition:box-shadow .24s ease}
      .todo-note.is-popping{animation:todo-pop .42s cubic-bezier(.34,1.4,.64,1)}
      .todo-note.status-completed{filter:saturate(.62);opacity:.72}
      .todo-note.status-completed .todo-note-text{text-decoration:line-through;text-decoration-thickness:1.5px;text-decoration-color:color-mix(in srgb,#343743 42%,transparent)}
      .todo-note.color-rose{--paper:#FFD1DC}.todo-note.color-peach{--paper:#FFD7C2}.todo-note.color-apricot{--paper:#FFE0B5}.todo-note.color-lemon{--paper:#FFF3B0}.todo-note.color-sage{--paper:#DDE8C8}.todo-note.color-mint{--paper:#CBEEDD}.todo-note.color-aqua{--paper:#CDEFF2}.todo-note.color-sky{--paper:#CEE8FF}.todo-note.color-periwinkle{--paper:#D8DEFF}.todo-note.color-lilac{--paper:#E5D5FF}.todo-note.color-lavender{--paper:#EADFF5}

      .todo-note-heading{display:flex;align-items:flex-start;gap:8px;min-width:0;padding-right:14px}
      .todo-note h3{flex:1;min-width:0;margin:1px 0 0;font-size:15.5px;font-weight:640;line-height:1.45;letter-spacing:0;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}

      .todo-status-light{flex:0 0 30px;display:grid;place-items:center;width:30px;height:30px;margin:-5px 0 0 -6px;padding:0;border:0;border-radius:50%;background:transparent;appearance:none;cursor:pointer;-webkit-tap-highlight-color:transparent}
      .todo-status-light:focus-visible{outline:2px solid rgba(52,55,67,.45);outline-offset:-4px}
      .todo-status-dot{position:relative;display:grid;place-items:center;width:19px;height:19px;border-radius:50%;transition:transform .18s cubic-bezier(.34,1.56,.64,1),background .2s ease,box-shadow .2s ease;color:transparent}
      .todo-status-light:active .todo-status-dot{transform:scale(.88)}
      .todo-status-light:hover .todo-status-dot{transform:scale(1.1)}
      .todo-status-light.status-pending .todo-status-dot{background:transparent;box-shadow:inset 0 0 0 2px #f29d36;animation:todo-dot-breathe 2.8s ease-in-out infinite}
      .todo-status-light.status-completed .todo-status-dot{background:#37b575;color:#fff;box-shadow:0 3px 8px rgba(55,181,117,.34)}
      .todo-status-light.status-completed .todo-status-dot svg path{stroke-dasharray:22;animation:todo-check-draw .32s ease-out both}

      .todo-note-details{display:flex;flex-direction:column;gap:7px;margin-top:14px;padding-left:26px;color:color-mix(in srgb,#343743 76%,transparent);font-size:12.5px}
      .todo-note-detail{display:flex;align-items:center;gap:7px;min-width:0;line-height:1.4}
      .todo-note-detail svg{width:15px;height:15px;flex:0 0 15px;opacity:.82}
      .todo-note-detail span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .todo-note-time.is-overdue{color:#b83e4a;font-weight:700}
      .todo-note-detail em{flex:0 0 auto;padding:2px 5px;border-radius:999px;background:rgba(214,73,85,.12);color:#b83e4a;font-size:9px;font-style:normal;font-weight:800}

      /* ---------- fab ---------- */
      .todo-fab{position:fixed;right:30px;bottom:26px;z-index:9;display:grid;place-items:center;width:56px;height:56px;padding:0;border:0;border-radius:50%;background:linear-gradient(150deg,color-mix(in srgb,#fff 16%,var(--dsw-alias-brand-primary,#5068ee)),var(--dsw-alias-brand-primary,#5068ee) 62%);color:#fff;box-shadow:0 14px 30px color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 34%,transparent);cursor:pointer;transition:transform .18s cubic-bezier(.34,1.56,.64,1),box-shadow .18s ease}
      .todo-fab:active{transform:scale(.93)}
      .todo-fab:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 18px 36px color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 40%,transparent)}
      .todo-fab-ring{position:absolute;inset:-3px;border-radius:50%;border:1.5px solid color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 45%,transparent);animation:todo-fab-ring 3.2s ease-out infinite;pointer-events:none}

      /* ---------- empty ---------- */
      .todo-empty{display:flex;min-height:400px;flex-direction:column;align-items:center;justify-content:center;text-align:center;animation:todo-fade-in .4s ease both}
      .todo-empty-note{display:flex;width:150px;min-height:116px;flex-direction:column;align-items:center;justify-content:center;padding:20px;border-radius:9px 15px 10px 14px;background:linear-gradient(165deg,color-mix(in srgb,#fff 40%,#f6d269) 0%,color-mix(in srgb,#f6d269 32%,var(--dsw-alias-bg-layer-1)) 100%);box-shadow:0 14px 30px color-mix(in srgb,var(--dsw-alias-label-primary) 12%,transparent);transform:rotate(-2.2deg);transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
      .todo-empty:hover .todo-empty-note{transform:rotate(0) translateY(-3px)}
      .todo-empty-plus{font-size:29px;font-weight:300;line-height:1}
      .todo-empty-note strong{margin-top:9px;font-size:12.5px}
      .todo-empty p{margin:20px 0 0;color:var(--dsw-alias-label-secondary);font-size:12.5px}

      /* ---------- modal ---------- */
      .todo-modal-backdrop{position:fixed;inset:0;z-index:40;display:grid;place-items:center;padding:20px;background:color-mix(in srgb,#0d1018 46%,transparent);backdrop-filter:blur(6px);animation:todo-fade-in .18s ease both}
      .todo-modal{width:min(474px,100%);max-height:calc(100dvh - 40px);display:flex;flex-direction:column;overflow:hidden;border:1px solid var(--dsw-alias-border-l1);border-radius:20px;background:var(--dsw-alias-bg-layer-1);box-shadow:0 30px 84px rgba(0,0,0,.3);animation:todo-sheet-in .26s cubic-bezier(.22,1,.36,1) both}
      .todo-modal-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px 10px;flex:0 0 auto}
      .todo-modal-head>div{display:flex;align-items:center;gap:10px}
      .todo-modal h2{margin:0;font-size:18.5px;font-weight:730;letter-spacing:-.015em}
      .todo-paper-dot{width:11px;height:11px;border-radius:3px;background:#FFE7A3;box-shadow:0 1px 3px rgba(0,0,0,.16);transition:background .2s ease}
      .todo-paper-dot.color-rose{background:#FFD1DC}.todo-paper-dot.color-peach{background:#FFD7C2}.todo-paper-dot.color-apricot{background:#FFE0B5}.todo-paper-dot.color-lemon{background:#FFF3B0}.todo-paper-dot.color-sage{background:#DDE8C8}.todo-paper-dot.color-mint{background:#CBEEDD}.todo-paper-dot.color-aqua{background:#CDEFF2}.todo-paper-dot.color-sky{background:#CEE8FF}.todo-paper-dot.color-periwinkle{background:#D8DEFF}.todo-paper-dot.color-lilac{background:#E5D5FF}.todo-paper-dot.color-lavender{background:#EADFF5}
      .todo-modal-close{display:grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:9px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;transition:background .16s ease,transform .16s ease}
      .todo-modal-close:hover{background:var(--dsw-alias-bg-layer-2);transform:rotate(90deg)}
      .todo-modal-body{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;padding:2px 20px 6px;display:flex;flex-direction:column;gap:13px}

      /* smart input */
      .todo-smart{display:flex;flex-direction:column;gap:7px}
      .todo-smart-label{color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:650}
      .todo-smart-box{display:flex;align-items:center;gap:7px;padding:4px 5px 4px 13px;border:1.5px solid color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 42%,var(--dsw-alias-border-l1));border-radius:13px;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 5%,var(--dsw-alias-bg-layer-2));transition:border-color .2s ease,box-shadow .2s ease}
      .todo-smart-box:focus-within{border-color:var(--dsw-alias-brand-primary,#5068ee);box-shadow:0 0 0 3.5px color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 14%,transparent)}
      .todo-smart.is-shaking .todo-smart-box{animation:todo-shake .5s ease}
      .todo-smart-input{flex:1;min-width:0;height:42px;border:0;outline:0;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:14px}
      .todo-smart-input::placeholder{color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));opacity:.8}
      .todo-voice-btn{flex:0 0 36px;display:grid;place-items:center;width:36px;height:36px;padding:0;border:0;border-radius:10px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);cursor:pointer;transition:background .16s ease,color .16s ease}
      .todo-voice-btn.is-listening{background:#e84e5b;color:#fff;animation:todo-pop 1.1s ease-in-out infinite}
      .todo-smart-hint{display:flex;align-items:center;gap:6px;margin:0;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-size:10.5px}
      .todo-smart-spark{width:6px;height:6px;border-radius:50%;background:linear-gradient(140deg,#f29d36,#e84e5b);animation:todo-spark 2.4s ease-in-out infinite}

      /* detected chips */
      .todo-detected{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
      .todo-chip{display:inline-flex;align-items:center;gap:6px;height:31px;max-width:100%;padding:0 8px 0 10px;border:1px solid transparent;border-radius:999px;font:inherit;font-size:11.5px;cursor:pointer;animation:todo-chip-in .24s cubic-bezier(.22,1,.36,1) both}
      .todo-chip span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:190px}
      .todo-chip-time{border-color:color-mix(in srgb,#5068ee 34%,transparent);background:color-mix(in srgb,#5068ee 11%,var(--dsw-alias-bg-layer-2));color:color-mix(in srgb,#5068ee 72%,var(--dsw-alias-label-primary));font-weight:650}
      .todo-chip-place{border-color:color-mix(in srgb,#37b575 34%,transparent);background:color-mix(in srgb,#37b575 10%,var(--dsw-alias-bg-layer-2));color:color-mix(in srgb,#2b9660 74%,var(--dsw-alias-label-primary));font-weight:650}
      .todo-chip-repeat{border-color:color-mix(in srgb,#37b575 38%,transparent);background:color-mix(in srgb,#37b575 12%,var(--dsw-alias-bg-layer-2));color:color-mix(in srgb,#2b9660 80%,var(--dsw-alias-label-primary));font-weight:650;padding:0 11px}
      .todo-plan-list{display:flex;flex-direction:column;gap:5px;margin:2px 0 0;padding:9px 11px;list-style:none;border:1px dashed color-mix(in srgb,#f29d36 42%,transparent);border-radius:11px;background:color-mix(in srgb,#f29d36 7%,var(--dsw-alias-bg-layer-1));animation:todo-chip-in .2s ease both}
      .todo-plan-list li{display:flex;align-items:baseline;gap:8px;font-size:11.5px;line-height:1.5}
      .todo-plan-list li::before{content:'';flex:0 0 auto;width:5px;height:5px;border-radius:50%;background:color-mix(in srgb,#f29d36 80%,transparent);transform:translateY(-2px)}
      .todo-plan-title{font-weight:650;color:var(--dsw-alias-label-primary);word-break:break-all}
      .todo-plan-list em{margin-left:auto;flex:0 0 auto;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-style:normal;font-size:10.5px;white-space:nowrap}
      .todo-note-repeat{align-self:flex-start;margin-top:5px;padding:1px 7px;border-radius:999px;background:color-mix(in srgb,#37b575 14%,transparent);color:color-mix(in srgb,#2b9660 82%,var(--dsw-alias-label-primary));font-size:9.5px;font-weight:650}
      .todo-chip-multi{border-color:color-mix(in srgb,#f29d36 40%,transparent);background:color-mix(in srgb,#f29d36 12%,var(--dsw-alias-bg-layer-2));color:color-mix(in srgb,#b8781f 78%,var(--dsw-alias-label-primary));font-weight:700;padding:0 11px}
      .todo-chip-x{display:grid;place-items:center;width:17px;height:17px;border-radius:50%;background:color-mix(in srgb,#000 7%,transparent);color:inherit;font-size:12px;font-weight:700;line-height:1;font-style:normal}
      .todo-chip-x:hover{background:color-mix(in srgb,#000 13%,transparent)}

      /* time row */
      .todo-time-row{display:flex;align-items:center;gap:10px;width:100%;padding:11px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:13px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;transition:border-color .18s ease,background .18s ease,transform .14s ease}
      .todo-time-row:active{transform:scale(.99)}
      .todo-time-row:hover{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 40%,var(--dsw-alias-border-l1))}
      .todo-time-row-icon{display:grid;place-items:center;width:30px;height:30px;flex:0 0 30px;border-radius:9px;background:color-mix(in srgb,#5068ee 12%,transparent);color:color-mix(in srgb,#5068ee 82%,var(--dsw-alias-label-primary))}
      .todo-time-row-text{display:flex;flex:1;min-width:0;flex-direction:column;gap:2px}
      .todo-time-row-text strong{font-size:13px;font-weight:650;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .todo-time-row-text em{font-size:10.5px;font-style:normal;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary))}
      .todo-time-row>svg{color:var(--dsw-alias-label-secondary);flex:0 0 auto}

      /* picker */
      .todo-picker{display:flex;flex-direction:column;gap:11px;padding:12px;border:1px solid var(--dsw-alias-border-l1);border-radius:15px;background:var(--dsw-alias-bg-layer-2);animation:todo-sheet-in .22s cubic-bezier(.22,1,.36,1) both}
      .todo-quick-row{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none}
      .todo-quick-row::-webkit-scrollbar{display:none}
      .todo-quick-chip{flex:0 0 auto;height:29px;padding:0 11px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;font-weight:600;cursor:pointer;transition:transform .14s ease,background .14s ease,color .14s ease}
      .todo-quick-chip:active{transform:scale(.94)}
      .todo-quick-chip:hover{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 10%,var(--dsw-alias-bg-layer-1));color:var(--dsw-alias-label-primary)}
      .todo-cal-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
      .todo-cal-head strong{font-size:12.5px;font-weight:700}
      .todo-cal-nav{display:grid;place-items:center;width:28px;height:28px;padding:0;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;transition:background .16s ease}
      .todo-cal-nav:hover{background:var(--dsw-alias-bg-layer-1)}
      .todo-cal-week,.todo-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
      .todo-cal-week span{text-align:center;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-size:10px;font-weight:650}
      .todo-cal-day,.todo-cal-blank{aspect-ratio:1;min-height:29px}
      .todo-cal-day{display:grid;place-items:center;padding:0;border:0;border-radius:9px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:11.5px;cursor:pointer;transition:background .14s ease,color .14s ease,transform .14s ease}
      .todo-cal-day:hover{background:var(--dsw-alias-bg-layer-1)}
      .todo-cal-day:active{transform:scale(.9)}
      .todo-cal-day.is-past{color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));opacity:.55}
      .todo-cal-day.is-today{box-shadow:inset 0 0 0 1.5px color-mix(in srgb,#f29d36 60%,transparent);font-weight:700}
      .todo-cal-day.is-selected{background:var(--dsw-alias-button-primary-fill,var(--dsw-alias-brand-primary,#5068ee));color:#fff;font-weight:700;box-shadow:0 4px 10px color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 34%,transparent)}
      .todo-picker-time{display:flex;flex-direction:column;gap:9px;padding-top:10px;border-top:1px solid var(--dsw-alias-border-l1)}
      .todo-picker-time-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
      .todo-picker-time-head strong{font-size:11.5px}
      .todo-mode-switch{display:inline-flex;gap:2px;padding:2px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
      .todo-mode-switch button{height:24px;padding:0 9px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:10.5px;font-weight:650;white-space:nowrap;cursor:pointer;transition:background .16s ease,color .16s ease}
      .todo-mode-switch button.is-active{background:var(--dsw-alias-button-primary-fill,var(--dsw-alias-brand-primary,#5068ee));color:#fff}
      .todo-wheel-line{display:flex;align-items:center;gap:5px;animation:todo-fade-in .2s ease both}
      .todo-wheel-label{flex:0 0 28px;color:var(--dsw-alias-label-secondary);font-size:10.5px;font-weight:650}
      .todo-wheel{position:relative;flex:1 1 0;min-width:0;height:102px;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);overflow:hidden}
      .todo-wheel-scroll{height:100%;overflow-y:auto;overflow-x:hidden;padding:34px 0;scrollbar-width:none;overscroll-behavior:contain;touch-action:none}
      .todo-wheel-scroll::-webkit-scrollbar{display:none}
      .todo-wheel-pad{display:block;height:34px}
      .todo-wheel-item{display:block;width:100%;height:34px;line-height:34px;text-align:center;border:0;border-radius:9px;background:transparent;font-size:13px;font-family:inherit;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;transition:color .12s ease}
      .todo-wheel-item.is-active{color:var(--dsw-alias-label-primary);font-weight:700;transform:scale(1.06)}
      .todo-wheel-band{position:absolute;left:5px;right:5px;top:34px;height:34px;border-radius:9px;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 10%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 22%,transparent);pointer-events:none}
      .todo-wheel-colon{flex:0 0 auto;color:var(--dsw-alias-label-secondary);font-weight:700;font-size:13px}
      .todo-wheel-clear{flex:0 0 auto;display:grid;place-items:center;width:22px;height:22px;padding:0;border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font:inherit;font-size:15px;line-height:1;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .15s ease,color .15s ease}
      .todo-wheel-clear:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
      .todo-repeat-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
      .todo-repeat-label{color:var(--dsw-alias-label-secondary);font-size:10.5px;font-weight:650;margin-right:1px}
      .todo-repeat-chip{height:25px;padding:0 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;font-size:10.5px;font-weight:650;cursor:pointer;transition:background .16s ease,border-color .16s ease,color .16s ease,transform .14s ease}
      .todo-repeat-chip:active{transform:scale(.95)}
      .todo-repeat-chip.is-active{background:color-mix(in srgb,#37b575 15%,var(--dsw-alias-bg-layer-1));border-color:color-mix(in srgb,#37b575 42%,transparent);color:color-mix(in srgb,#2b9660 82%,var(--dsw-alias-label-primary))}
      .todo-picker-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
      .todo-link-btn{padding:0;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;cursor:pointer;text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--dsw-alias-label-secondary) 40%,transparent)}
      .todo-picker-preview{color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-size:11px;font-weight:650;font-variant-numeric:tabular-nums}

      /* more panel */
      .todo-more-toggle{display:flex;align-items:center;gap:6px;align-self:flex-start;padding:3px 2px;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:11.5px;font-weight:650;cursor:pointer}
      .todo-more-toggle:hover{color:var(--dsw-alias-label-primary)}
      .todo-more-caret{display:inline-block;transition:transform .2s ease;font-size:10px}
      .todo-more-caret.is-open{transform:rotate(180deg)}
      .todo-more-panel{display:flex;flex-direction:column;gap:11px;padding:12px;border:1px dashed var(--dsw-alias-border-l1);border-radius:13px;animation:todo-sheet-in .2s ease both}
      .todo-field{display:flex;flex-direction:column;gap:6px;color:var(--dsw-alias-label-secondary);font-size:11.5px;font-weight:650}
      .todo-field input{height:40px;padding:0 11px;border:1px solid var(--dsw-alias-border-l1);border-radius:11px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;outline:0;transition:border-color .18s ease}
      .todo-field input:focus{border-color:color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 55%,var(--dsw-alias-border-l1))}
      .todo-more-panel fieldset{margin:0;padding:0;border:0}
      .todo-more-panel legend{margin-bottom:8px;padding:0;color:var(--dsw-alias-label-secondary);font-size:11.5px;font-weight:650}
      .todo-color-picker{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;max-width:280px}
      .todo-color-picker button{display:grid;place-items:center;aspect-ratio:1;padding:0;border:2px solid transparent;border-radius:10px;background:#FFE7A3;cursor:pointer;transition:transform .16s cubic-bezier(.34,1.56,.64,1),border-color .16s ease}
      .todo-color-picker button:active{transform:scale(.9)}
      .todo-color-picker button.color-rose{background:#FFD1DC}.todo-color-picker button.color-peach{background:#FFD7C2}.todo-color-picker button.color-apricot{background:#FFE0B5}.todo-color-picker button.color-lemon{background:#FFF3B0}.todo-color-picker button.color-sage{background:#DDE8C8}.todo-color-picker button.color-mint{background:#CBEEDD}.todo-color-picker button.color-aqua{background:#CDEFF2}.todo-color-picker button.color-sky{background:#CEE8FF}.todo-color-picker button.color-periwinkle{background:#D8DEFF}.todo-color-picker button.color-lilac{background:#E5D5FF}.todo-color-picker button.color-lavender{background:#EADFF5}
      .todo-color-picker button.is-selected{border-color:var(--dsw-alias-label-primary);transform:scale(1.06)}
      .todo-swatch-check{display:grid;place-items:center;color:#343743}

      /* modal footer */
      .todo-modal-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 20px 16px;flex:0 0 auto;border-top:1px solid var(--dsw-alias-border-l1);background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 96%,transparent)}
      .todo-modal-foot>div{display:flex;align-items:center;gap:8px}
      .todo-foot-actions{display:flex;align-items:center;gap:8px;margin-left:auto}
      .todo-foot-hint{flex:1 1 auto;min-width:0;color:var(--dsw-alias-label-secondary);font-size:11.5px;line-height:1.45}
      .todo-foot-hint{color:var(--dsw-alias-label-tertiary,var(--dsw-alias-label-secondary));font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
      .todo-primary,.todo-secondary,.todo-danger{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:39px;padding:0 15px;border-radius:11px;font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;transition:transform .14s ease,filter .16s ease,background .16s ease}
      .todo-primary{border:0;background:var(--dsw-alias-button-primary-fill,var(--dsw-alias-brand-primary,#5068ee));color:#fff;box-shadow:0 6px 16px color-mix(in srgb,var(--dsw-alias-brand-primary,#5068ee) 28%,transparent)}
      .todo-primary:active{transform:scale(.97)}
      .todo-primary:hover{filter:brightness(1.06)}
      .todo-primary:disabled{opacity:.42;cursor:not-allowed;box-shadow:none}
      .todo-secondary{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
      .todo-secondary:active{transform:scale(.97)}
      .todo-danger{height:34px;padding:0 10px;border:0;background:transparent;color:#d64955;font-size:11.5px}
      .todo-danger:hover,.todo-danger.is-confirming{background:color-mix(in srgb,#d64955 10%,transparent);border-radius:9px}

      /* toast */
      .todo-toast{position:fixed;left:50%;bottom:96px;z-index:60;display:flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;background:color-mix(in srgb,#11151f 88%,transparent);color:#fff;font-size:12px;font-weight:650;box-shadow:0 12px 30px rgba(0,0,0,.28);animation:todo-toast-in .26s cubic-bezier(.22,1,.36,1) both;pointer-events:none}

      button:focus-visible,input:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-brand-primary,#5068ee));outline-offset:2px}

      /* ---------- responsive ---------- */
      @media(max-width:1080px){
        .todo-note-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
        .todo-wall{width:min(100% - 44px,860px)}
      }
      @media(max-width:860px){
        .todo-header{align-items:flex-start;flex-direction:column;gap:12px;padding:20px 22px 14px}
        .todo-header-actions{width:100%}
        .todo-search{flex:1 1 190px;width:auto}
        .todo-heading h1{font-size:27px}
      }
      @media(max-width:640px){
        .todo-header{padding:18px 16px 12px;gap:9px}
        .todo-heading h1{font-size:25px}
        .todo-heading p{font-size:12px}
        .todo-pending-chip{display:none}
        .todo-search{order:1;flex:1 1 100%;width:100%}
        .todo-time-filter{order:2;flex:1 1 auto;min-width:132px}
        .todo-time-trigger{width:100%;max-width:none}
        .todo-time-popover{right:auto;left:0;width:min(338px,calc(100vw - 32px));transform-origin:top left}
        .todo-filters{order:3}
        .todo-wall{width:calc(100% - 28px);padding-top:20px;padding-bottom:96px}
        .todo-note-grid{grid-template-columns:1fr;gap:13px}
        .todo-note{min-height:106px;padding:15px 15px 13px}
        .todo-note h3{font-size:15px}
        .todo-note-details{margin-top:11px;padding-left:24px}
        .todo-fab{right:16px;bottom:18px;width:52px;height:52px}

        /* bottom sheet so the keyboard never covers the actions */
        .todo-modal-backdrop{align-items:flex-end;padding:0}
        .todo-modal{width:100%;max-width:100%;max-height:min(88dvh,720px);border-radius:20px 20px 0 0;animation:todo-sheet-in .3s cubic-bezier(.22,1,.36,1) both}
        .todo-modal-body{padding:2px 16px 6px;gap:11px}
        .todo-modal-head{padding:15px 16px 8px}
        .todo-modal-foot{padding:10px 16px calc(12px + env(safe-area-inset-bottom,0px));gap:8px;flex-wrap:wrap}
        .todo-foot-hint{display:none}
        .todo-modal-foot>div{width:100%;justify-content:flex-end}
        .todo-primary,.todo-secondary{height:40px;font-size:13px}
        .todo-danger{order:-1}
        .todo-toast{bottom:88px}
        .todo-color-picker{max-width:none;gap:7px}
      }
      @media(max-height:520px){
        .todo-modal{max-height:calc(100dvh - 12px)}
      }
      @media(prefers-reduced-motion:reduce){
        .todo-note,.todo-modal,.todo-modal-backdrop,.todo-toast,.todo-chip,.todo-note.is-popping,.todo-status-light.status-pending .todo-status-dot,.todo-fab-ring,.todo-pending-dot,.todo-smart-spark{animation:none!important;transition:none!important}
      }
    `;

    

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({ name: 'sidebar.panellist', id: PANEL_ID, order: 20, label: () => copyFor(ctx.locale.getSnapshot().active).nav }, PanelIcon));
        ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: PANEL_ID }, () => h(TodoPanel, { runtime: ctx })));
        try { console.log('[smart-notes] ready'); } catch {}
      },
    };
  },
});
