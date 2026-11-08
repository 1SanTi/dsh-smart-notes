import fs from 'node:fs';
let s = fs.readFileSync('README.md', 'utf8');
const fails = [];
function P(a, b, label) { if (!s.includes(a)) { fails.push(label); return; } s = s.replace(a, b); }

P("当前版本：`1.0.0`", "当前版本：`1.1.0`", 'version');

P("### 便签墙",
`### 完成即归档

- 点卡片左侧圆点即完成：打勾描边 + 卡片弹跳 + 淡出成完成态，并播放一段两音上扬的提示音
- **完成的当天仍留在便签墙上**，第二天自动移入「档案」，不再占用墙面
- 标题栏的「档案」按钮（带条数角标）打开档案面板：按 全部 / 今天 / 近 7 天 / 近 30 天 过滤，每条显示地点、时间与完成时间
- 档案里可以「恢复」回便签墙（恢复时播放下行提示音），也可以「彻底删除」；「清空档案」需二次点击确认
- 归档只改状态归属，**从不自动删除数据**；音效可在标题栏开关，偏好存在 \`dsh.smart-notes.sound\`

### 便签墙`,
  'archive-section');

P("- 数据属于当前页面所对应的浏览器存储，不会自动同步到 GitHub",
  "- 完成的便签由 \`completedAt\` 决定何时进档案：完成日之后的第一个自然日才归档，所以跨天时重新打开页面会自动整理\n- 数据属于当前页面所对应的浏览器存储，不会自动同步到 GitHub",
  'storage-note');

P(`  due,      // 'YYYY-MM-DD'（全天）或 'YYYY-MM-DDTHH:MM'
  end,      // 'HH:MM'，可为空
  repeat,   // '' | 'daily' | 'weekday' | 'weekly' | 'weekly:1' | 'monthly' | 'monthly:5'
  status,   // 'pending' | 'done'
  color, createdAt, updatedAt`,
`  due,         // 'YYYY-MM-DD'（全天）或 'YYYY-MM-DDTHH:MM'
  end,         // 'HH:MM'，可为空
  repeat,      // '' | 'daily' | 'weekday' | 'weekly' | 'weekly:1' | 'monthly' | 'monthly:5'
  status,      // 'pending' | 'completed'
  completedAt, // 完成时间戳（毫秒）；未完成为 0。跨天后据此进档案
  color, createdAt, updatedAt`,
  'data-structure');

P("改动解析器后建议跑语料回归（本仓库开发期的三套语料：规矩句 111 条、真实口语 53 条、泛化探测 20 条，全部通过后再部署）。",
  "改动解析器后建议跑语料回归。本仓库开发期维护了四套语料，共 **233 条**，全部通过后再部署：\n\n| 语料 | 条数 | 内容 |\n| --- | --- | --- |\n| 规矩句 | 111 | 显式日期/时刻/重复的标准表达 |\n| 真实口语 | 53 | 语音识别出来的断句、口吃、语气词 |\n| 长文本多事件 | 44 | 一句话多件事、多时间、他人转述、复杂语义 |\n| 泛化探测 | 25 | 未参与调参的真实教师口语，用于检验过拟合 |\n\n每轮改动先跑全绿，再看有没有新句式能把通过率拉下来——出问题先判断是解析器错还是期望写错，别为了迁就一条错期望而改坏规则。",
  'corpora');

P("### 滚轮为什么不用原生滚动",
  "### 完成反馈为什么用 WebAudio 合成\n\n不引入任何音频文件：`playChime()` 用 `OscillatorNode` 现场合成两个正弦音（完成上扬 659→988 Hz，撤销下行 523→392 Hz），避免打包体积与格式兼容问题。首次播放需用户手势触发 `AudioContext`，正好由点击完成按钮满足。\n\n### 滚轮为什么不用原生滚动",
  'audio-note');

if (fails.length) { console.error('MISSING:', fails); process.exit(1); }
fs.writeFileSync('README.md', s);
console.log('ok');
