const storageKeys = {
  library: "creator-os-library-v1",
  preferences: "creator-os-preferences-v1",
  notes: "creator-os-notes-v1",
  observeFilter: "creator-os-observe-filter-v1",
  languageTab: "creator-os-language-tab-v1"
};

const content = [
  {
    id: "focus-ai-commerce",
    page: "today",
    category: "AI + E-commerce",
    title: "小红书店铺开始把 AI 图文当成日常货架能力",
    source: "Self-media / E-commerce",
    sourceName: "Self-media / E-commerce",
    sourceUrl: "",
    sourceType: "trend note",
    summary: "几家女装和香氛账号正在用 AI 做场景图、标题测试和评论区 FAQ，速度变快，但真正拉开差距的是选题和审美一致性。",
    aiNote: "可以观察它们如何把“工具效率”转成“品牌资产”，而不是只看生成图是否逼真。",
    tags: ["self-media", "AI", "e-commerce"],
    what: "AI 生成内容进入日常运营，而不是一次性营销活动。",
    why: "内容生产成本下降后，品牌调性和选题判断会更值钱。",
    connection: "适合连接到包装视觉、详情页结构和账号人设。"
  },
  {
    id: "fresh-khh-producer",
    page: "today",
    category: "K-Hiphop",
    title: "Producer tag 正在变成短视频记忆点",
    source: "K-Hiphop / Culture",
    sourceName: "K-Hiphop / Culture",
    sourceUrl: "",
    sourceType: "culture note",
    summary: "从 GroovyRoom 到 TOIL，一句 producer tag 让听众在 2 秒内进入语境。短视频剪辑也在放大这种声音品牌。",
    aiNote: "把 producer tag 当作声音 logo 看，会更容易理解 K-Hiphop 的传播方式。",
    tags: ["K-Hiphop", "sound identity", "culture"],
    what: "制作人标签从幕后署名变成可识别的文化符号。",
    why: "它让歌曲、制作人和片段传播形成更强绑定。",
    connection: "可参考品牌 sonic identity 与短视频开场节奏。"
  },
  {
    id: "fresh-packaging-system",
    page: "today",
    category: "Design",
    title: "低饱和包装不等于“性冷淡”",
    source: "Packaging / Editorial design",
    sourceName: "Packaging / Editorial design",
    sourceUrl: "",
    sourceType: "design note",
    summary: "近期韩国小众护肤和咖啡品牌把低饱和色、窄栏文字、材料纹理组合起来，重点不是空，而是让信息有呼吸。",
    aiNote: "观察字号、留白和材料之间的比例，比单纯收集配色更有用。",
    tags: ["design", "packaging", "K-brand"],
    what: "低饱和包装通过信息层级建立信任。",
    why: "用户在货架和详情页都需要快速判断质感。",
    connection: "可用于自媒体封面、详情页首屏和品牌视觉系统。"
  },
  {
    id: "observe-creator-commerce",
    page: "observe",
    category: "Self-media",
    title: "知识型博主的商品页正在变得更像一篇解释文",
    source: "Creator economy",
    sourceName: "Creator economy",
    sourceUrl: "",
    sourceType: "trend note",
    summary: "越来越多课程、模板和数字商品不再只堆卖点，而是先解释问题、使用场景和适合人群。",
    aiNote: "这说明“理解成本”正在成为转化成本的一部分。",
    tags: ["self-media", "e-commerce", "copywriting"],
    what: "商品详情页吸收了长文解释和 FAQ 的结构。",
    why: "用户需要先确认“这是不是为我准备的”。",
    connection: "可参考到 Creator OS 未来的 Create 模块，但 MVP 先只观察。"
  },
  {
    id: "observe-korean-cover-art",
    page: "observe",
    category: "K-Hiphop",
    title: "K-Hiphop cover art 的字体变得更克制",
    source: "Music visual",
    sourceName: "Music visual",
    sourceUrl: "",
    sourceType: "culture note",
    summary: "新一批单曲封面减少了夸张特效，更多使用摄影、窄体字和更像杂志的版式。",
    aiNote: "这种变化把音乐从“冲击感”推向“生活方式与身份感”。",
    tags: ["K-Hiphop", "design", "cover art"],
    what: "封面视觉更偏 editorial，而不是海报式爆点。",
    why: "它适合在流媒体小图、社媒九宫格和周边上保持一致。",
    connection: "可收藏为品牌视觉和音乐文化交叉案例。"
  },
  {
    id: "observe-ai-agents",
    page: "observe",
    category: "AI",
    title: "AI agent demo 的真正看点是任务边界",
    source: "AI workflow",
    sourceName: "AI workflow",
    sourceUrl: "",
    sourceType: "product note",
    summary: "很多演示看起来很强，但可用性取决于它能否清楚知道何时停下、何时问人、何时只做整理。",
    aiNote: "Creator OS 里的 AI 应该像编辑，不像抢话的助手。",
    tags: ["AI", "workflow", "product"],
    what: "Agent 从展示能力转向处理真实工作流。",
    why: "边界感决定用户是否愿意长期使用。",
    connection: "对应产品规则里的 AI is editorial。"
  },
  {
    id: "observe-live-commerce",
    page: "observe",
    category: "E-commerce",
    title: "直播切片标题越来越像短剧钩子",
    source: "E-commerce content",
    sourceName: "E-commerce content",
    sourceUrl: "",
    sourceType: "trend note",
    summary: "“我以为这只是便宜，结果...”这类标题把商品卖点包装成情节反转。有效，但容易消耗信任。",
    aiNote: "值得观察，但不要照搬；品牌长期资产需要更稳的解释方式。",
    tags: ["e-commerce", "copywriting", "trust"],
    what: "直播内容借用叙事钩子提高点击。",
    why: "用户在信息流里先被故事结构吸引。",
    connection: "可以反向学习：怎样写得有吸引力但不油腻。"
  }
];

const languageLessons = {
  english: {
    id: "language-english-brief",
    category: "English",
    title: "Today's English: say it with less pressure",
    phrase: "I'm still shaping the idea.",
    translation: "我还在把这个想法整理成型。",
    summary: "适合在讨论选题、设计方案或商业计划时使用，比“I don't know yet”更主动。",
    sourceName: "Creator OS Language",
    sourceUrl: "",
    sourceType: "lesson",
    aiNote: "这句话把不确定表达成进行中的判断，很适合创作者语境。",
    tags: ["English", "useful sentence", "creator work"],
    words: [
      ["shape", "塑造、整理，让想法成型"],
      ["still", "还在，强调过程没有结束"],
      ["idea", "想法、选题、创意方向"]
    ]
  },
  korean: {
    id: "language-korean-taste",
    category: "Korean",
    title: "오늘의 한국어: taste and vibe",
    phrase: "제 취향은 아니에요.",
    translation: "这不是我的取向 / 不太是我的菜。",
    summary: "比直接说“不好”更礼貌，适合聊音乐、穿搭、设计和内容风格。",
    sourceName: "Creator OS Language",
    sourceUrl: "",
    sourceType: "lesson",
    aiNote: "취향 是理解韩国流行文化很重要的词，它同时包含品味、偏好和身份感。",
    tags: ["Korean", "culture", "taste"],
    words: [
      ["제", "我的，礼貌表达中的第一人称"],
      ["취향", "取向、品味、个人偏好"],
      ["아니에요", "不是，用于较礼貌语气"]
    ]
  }
};

let state = {
  library: read(storageKeys.library, []),
  preferences: read(storageKeys.preferences, {}),
  notes: read(storageKeys.notes, {}),
  observeFilter: localStorage.getItem(storageKeys.observeFilter) || "All",
  languageTab: localStorage.getItem(storageKeys.languageTab) || "english"
};

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}

function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function isSaved(id) { return state.library.some(item => item.id === id); }
function getContent(id) { return content.find(item => item.id === id) || Object.values(languageLessons).find(item => item.id === id); }

function render() {
  renderToday();
  renderObserve();
  renderLanguage();
  renderLibrary();
  bindActions();
}

function renderToday() {
  const focus = content[0];
  const fresh = content.slice(1, 3);
  const continueItems = [languageLessons.english, languageLessons.korean, content[3]];
  document.querySelector("#today").innerHTML = `
    <div class="today-editor-opening" aria-label="Editor's Opening">
      <span class="page-kicker">Editor's Opening</span>
      <p id="today-title">今天，先看一件真正值得理解的事。</p>
    </div>

    <article class="today-focus" aria-label="Today's Focus">
      <div class="today-focus-copy">
        <span class="panel-label">Today's Focus</span>
        <h1>${focus.title}</h1>
        <p>${focus.summary}</p>
        ${sourceLink(focus)}
      </div>
      <div class="today-focus-aside">
        <span>Why it matters</span>
        <p>${focus.aiNote}</p>
        ${tags(focus.tags)}
        ${actions(focus.id)}
      </div>
    </article>

    <section class="today-section" aria-label="Fresh Finds">
      <div class="today-section-heading">
        <span class="panel-label">Fresh Finds</span>
      </div>
      <div class="fresh-grid">${fresh.map(item => `
        <article class="fresh-card">
          <span class="card-meta">${item.sourceName}</span>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          ${sourceLink(item)}
          ${actions(item.id)}
        </article>`).join("")}</div>
    </section>

    <section class="today-continue" aria-label="Continue Learning">
      <span class="panel-label">Continue Learning</span>
      <div class="focus-list">${continueItems.map(item => `
        <div class="focus-row"><strong>${item.category}</strong><span>${item.title}</span></div>`).join("")}</div>
    </section>`;
}
function renderObserve() {
  const filters = ["All", "Self-media", "Design", "K-Hiphop", "AI", "E-commerce"];
  const items = content.filter(item => item.page === "observe" || item.page === "today").filter(item => state.observeFilter === "All" || item.category.includes(state.observeFilter) || item.tags.includes(state.observeFilter));
  document.querySelector("#observe").innerHTML = `
    <span class="page-kicker">Observe</span>
    <h1 id="observe-title" class="page-title">Observe, do not chase.</h1>
    <p class="page-subtitle">Trends shown as context: what happened, why it matters, and what it connects to.</p>
    <div class="toolbar">${filters.map(filter => `<button class="chip ${state.observeFilter === filter ? "active" : ""}" data-filter="${filter}">${filter}</button>`).join("")}</div>
    <div class="content-grid">${items.map(observeCard).join("")}</div>`;
}

function observeCard(item) {
  return `<article class="item-card observe-card">
    <span class="card-meta">${item.category} / ${item.source}</span>
    <h3>${item.title}</h3>
    <p>${item.summary}</p>
    <div class="what-why"><span><strong>What:</strong> ${item.what}</span><span><strong>Why:</strong> ${item.why}</span><span><strong>Connection:</strong> ${item.connection}</span></div>
    <div class="editor-note"><span class="editor-mark"></span><p>${item.aiNote}</p></div>
    ${tags(item.tags)}${actions(item.id)}
  </article>`;
}

function renderLanguage() {
  const lesson = languageLessons[state.languageTab];
  const secondary = state.languageTab === "english" ? languageLessons.korean : languageLessons.english;
  document.querySelector("#language").innerHTML = `
    <span class="page-kicker">Language</span>
    <h1 id="language-title" class="page-title">Language is a window.</h1>
    <p class="page-subtitle">One primary lesson plus a lighter second exposure, connected to culture and real creator work.</p>
    <div class="toolbar">
      <button class="chip ${state.languageTab === "english" ? "active" : ""}" data-language="english">English</button>
      <button class="chip ${state.languageTab === "korean" ? "active" : ""}" data-language="korean">Korean</button>
    </div>
    <div class="lesson-hero">
      <article class="lesson-card">
        <span class="card-meta">Primary lesson / ${lesson.category}</span>
        <h3>${lesson.title}</h3>
        <div class="phrase">${lesson.phrase}</div>
        <p class="translation">${lesson.translation}</p>
        <p>${lesson.summary}</p>
        <div class="word-list">${lesson.words.map(([word, desc]) => `<div class="word-row"><strong>${word}</strong><span>${desc}</span></div>`).join("")}</div>
        <div class="editor-note"><span class="editor-mark"></span><p>${lesson.aiNote}</p></div>
        ${tags(lesson.tags)}${actions(lesson.id)}
      </article>
      <article class="lesson-card">
        <span class="card-meta">Secondary exposure / ${secondary.category}</span>
        <h3>${secondary.title}</h3>
        <div class="phrase">${secondary.phrase}</div>
        <p class="translation">${secondary.translation}</p>
        <p>${secondary.summary}</p>
        ${actions(secondary.id)}
      </article>
    </div>`;
}

function renderLibrary() {
  const saved = state.library.map(item => ({ ...getContent(item.id), savedAt: item.savedAt })).filter(Boolean);
  document.querySelector("#library").innerHTML = `
    <span class="page-kicker">Library</span>
    <h1 id="library-title" class="page-title">Saved knowledge, not just bookmarks.</h1>
    <p class="page-subtitle">Saved items keep category, tags, notes and related context in localStorage first.</p>
    <div class="library-grid">
      <section>
        ${saved.length ? saved.map(libraryCard).join("") : `<div class="empty-state">No saved items yet. Save something from Today, Observe or Language and it will appear here.</div>`}
      </section>
      <aside class="panel">
        <span class="panel-label">Library State</span>
        <div class="saved-count">${saved.length}</div>
        <p class="card-copy">items saved locally</p>
        <div class="focus-list">
          <div class="focus-row"><strong>Interested</strong><span>${countPreference("Interested")}</span></div>
          <div class="focus-row"><strong>Not interested</strong><span>${countPreference("Not interested")}</span></div>
          <div class="focus-row"><strong>Not my taste</strong><span>${countPreference("Not my taste")}</span></div>
        </div>
      </aside>
    </div>`;
}

function libraryCard(item) {
  const note = state.notes[item.id] || "";
  return `<article class="library-card" data-library-id="${item.id}">
    <span class="card-meta">${item.category}</span>
    <h3>${item.title}</h3>
    <p>${item.summary}</p>
    ${tags(item.tags || [])}
    <textarea class="note-input" data-note-id="${item.id}" placeholder="Add a short note or connection...">${note}</textarea>
    <div class="actions">
      <button class="text-button" data-save-note="${item.id}">Save note</button>
      <button class="remove-button" data-remove="${item.id}">Remove</button>
    </div>
  </article>`;
}

function tags(list) { return `<div class="tag-row">${list.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>`; }

function sourceLink(item) {
  if (!item.sourceUrl) return "";
  return `<a class="source-link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">Source ↗</a>`;
}

function actions(id) {
  const preference = state.preferences[id] || "";
  return `<div class="actions" data-actions="${id}">
    <button class="save-button ${isSaved(id) ? "saved" : ""}" data-save="${id}">${isSaved(id) ? "Saved" : "Save to Library"}</button>
    ${["Interested", "Not interested", "Not my taste"].map(label => `<button class="action-button ${preference === label ? "active" : ""}" data-preference="${id}" data-value="${label}">${label}</button>`).join("")}
  </div>`;
}

function countPreference(label) { return Object.values(state.preferences).filter(value => value === label).length; }

function bindActions() {
  document.querySelectorAll("[data-save]").forEach(button => button.addEventListener("click", () => toggleSave(button.dataset.save)));
  document.querySelectorAll("[data-preference]").forEach(button => button.addEventListener("click", () => setPreference(button.dataset.preference, button.dataset.value)));
  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => setObserveFilter(button.dataset.filter)));
  document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  document.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => removeFromLibrary(button.dataset.remove)));
  document.querySelectorAll("[data-save-note]").forEach(button => button.addEventListener("click", () => saveNote(button.dataset.saveNote)));
}

function toggleSave(id) {
  state.library = isSaved(id) ? state.library.filter(item => item.id !== id) : [{ id, savedAt: new Date().toISOString() }, ...state.library];
  write(storageKeys.library, state.library);
  render();
}

function removeFromLibrary(id) { state.library = state.library.filter(item => item.id !== id); write(storageKeys.library, state.library); render(); }

function setPreference(id, value) {
  state.preferences[id] = state.preferences[id] === value ? "" : value;
  write(storageKeys.preferences, state.preferences);
  render();
}

function setObserveFilter(filter) { state.observeFilter = filter; localStorage.setItem(storageKeys.observeFilter, filter); renderObserve(); bindActions(); }
function setLanguage(language) { state.languageTab = language; localStorage.setItem(storageKeys.languageTab, language); renderLanguage(); bindActions(); }

function saveNote(id) {
  const input = document.querySelector(`[data-note-id="${id}"]`);
  state.notes[id] = input.value.trim();
  write(storageKeys.notes, state.notes);
  renderLibrary();
  bindActions();
}

function setPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active", page.id === pageId));
  document.querySelectorAll("[data-page]").forEach(item => item.classList.toggle("active", item.dataset.page === pageId));
  if (location.hash !== `#${pageId}`) history.replaceState(null, "", `#${pageId}`);
}

function bindNavigation() {
  document.querySelectorAll("[data-page]").forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    setPage(link.dataset.page);
  }));
  const initial = location.hash.replace("#", "") || "today";
  setPage(["today", "observe", "language", "library"].includes(initial) ? initial : "today");
}

render();
bindNavigation();
