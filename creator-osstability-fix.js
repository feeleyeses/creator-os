const cn = {
  today: "今日",
  observe: "观察",
  language: "语言",
  library: "资料库",
  all: "全部",
  categories: { "Self-media": "自媒体", Design: "审美与设计", "K-Hiphop": "K-Hiphop", AI: "AI", "E-commerce": "电商", Language: "语言" },
  types: { All: "全部", Expression: "表达", Grammar: "语法", Internet: "网络用语", Culture: "文化", Exam: "考试" },
  prefs: ["感兴趣", "不感兴趣", "不符合我的取向"]
};

const libraryV1Key = storageKeys.library;
const libraryV2Key = "creator-os-library-v2";
storageKeys.library = libraryV2Key;
state.invalidLibraryRecords = [];

function labelCategory(value) { return cn.categories[value] || value || ""; }
function labelType(value) { return cn.types[value] || value || ""; }
function validText(value) { return typeof value === "string" && value.trim(); }
function allContentItems() { return [...content, ...Object.values(languageLessons).flat()]; }
function findCurrentContent(id) { return allContentItems().find(item => item && item.id === id); }
function hasRenderableContent(item) { return Boolean(item && item.id && (validText(item.title) || validText(item.expression)) && (validText(item.page) || validText(item.category) || validText(item.language))); }
function savedSnapshot(item) {
  if (!item) return null;
  return {
    id: item.id,
    page: item.page || "",
    category: item.category || "",
    language: item.language || "",
    contentType: item.contentType || "",
    title: item.title || "",
    expression: item.expression || item.phrase || "",
    translation: item.translation || "",
    summary: item.summary || item.shortExplanation || "",
    tags: item.tags || [],
    sourceName: item.sourceName || "",
    sourceUrl: item.sourceUrl || "",
    sourceType: item.sourceType || "",
    author: item.author || "",
    publishedAt: item.publishedAt || "",
    imageUrl: item.imageUrl || "",
    imageAlt: item.imageAlt || "",
    savedAt: item.savedAt || new Date().toISOString()
  };
}
function normalizeSavedRecord(record) {
  if (!record || !record.id) return null;
  const current = findCurrentContent(record.id);
  const merged = { ...(current || {}), ...record };
  if (!hasRenderableContent(merged)) return null;
  return savedSnapshot(merged);
}
function migrateLibraryStorage() {
  const existingV2 = read(libraryV2Key, null);
  if (Array.isArray(existingV2)) {
    const cleaned = existingV2.map(normalizeSavedRecord).filter(Boolean);
    state.invalidLibraryRecords = existingV2.filter((record, index) => !cleaned[index]);
    if (state.invalidLibraryRecords.length) console.warn(`Creator OS: removed ${state.invalidLibraryRecords.length} invalid library records.`);
    state.library = cleaned;
    write(libraryV2Key, cleaned);
    return;
  }
  const oldRecords = read(libraryV1Key, []);
  const cleaned = Array.isArray(oldRecords) ? oldRecords.map(normalizeSavedRecord).filter(Boolean) : [];
  state.invalidLibraryRecords = Array.isArray(oldRecords) ? oldRecords.filter((record, index) => !cleaned[index]) : [];
  if (state.invalidLibraryRecords.length) console.warn(`Creator OS: removed ${state.invalidLibraryRecords.length} legacy library records.`);
  state.library = cleaned;
  write(libraryV2Key, cleaned);
}

function sourceMeta(entry) {
  if (!entry || (!entry.sourceName && !entry.sourceUrl)) return "";
  const details = [entry.sourceName, entry.sourceType, entry.author ? `作者：${entry.author}` : "", entry.publishedAt ? `发布于：${entry.publishedAt}` : ""].filter(Boolean).join(" &#183; ");
  return `<div class="source-meta">${details ? `<span>${details}</span>` : ""}${entry.sourceUrl ? `<a class="source-link" href="${entry.sourceUrl}" target="_blank" rel="noopener noreferrer">查看来源 &#8599;</a>` : ""}</div>`;
}
function actions(id) {
  const preference = state.preferences[id] || "";
  const saved = isSaved(id);
  return `<div class="actions" data-actions="${id}"><button class="save-button ${saved ? "saved" : ""}" data-save="${id}">${saved ? "已收藏" : "收藏到资料库"}</button>${cn.prefs.map(label => `<button class="action-button ${preference === label ? "active" : ""}" data-preference="${id}" data-value="${label}">${label}</button>`).join("")}</div>`;
}
function toggleSave(id) {
  if (isSaved(id)) {
    state.library = state.library.filter(item => item.id !== id);
  } else {
    const snapshot = savedSnapshot(findCurrentContent(id));
    if (snapshot) state.library = [snapshot, ...state.library.filter(item => item.id !== id)];
  }
  write(libraryV2Key, state.library);
  render();
}
function removeFromLibrary(id) {
  state.library = state.library.filter(item => item.id !== id);
  write(libraryV2Key, state.library);
  renderLibrary();
  bindActions();
}
function clearInvalidLibraryRecords() {
  const before = state.library.length;
  state.library = state.library.map(normalizeSavedRecord).filter(Boolean);
  state.invalidLibraryRecords = [];
  write(libraryV2Key, state.library);
  if (before !== state.library.length) console.warn(`Creator OS: cleared ${before - state.library.length} invalid library records.`);
  renderLibrary();
  bindActions();
}
function countPreference(label) { return Object.values(state.preferences).filter(value => value === label).length; }

function renderToday() {
  const focus = content.find(entry => entry.contentType === "Focus");
  const fresh = content.filter(entry => entry.page === "today" && entry.contentType === "Fresh Find").slice(0, 2);
  const continueItems = [languageLessons.english[0], languageLessons.korean[0], content.find(entry => entry.page === "observe")].filter(Boolean);
  document.querySelector("#today").innerHTML = `<div class="today-editor-opening" aria-label="编辑开场"><span class="page-kicker">编辑开场</span><p id="today-title">今天，先看一件真正值得理解的事。</p></div><article class="today-focus" aria-label="今日重点"><div class="today-focus-copy"><span class="panel-label">今日重点</span><h1>${focus.title}</h1><p>${focus.summary}</p></div><div class="today-focus-aside"><span>为什么值得关注</span><p>${focus.aiNote}</p>${tags(focus.tags)}${actions(focus.id)}${sourceMeta(focus)}</div></article><section class="today-section" aria-label="新鲜发现"><div class="today-section-heading"><span class="panel-label">新鲜发现</span></div><div class="fresh-grid">${fresh.map(entry => `<article class="fresh-card">${imageBlock(entry)}<div class="fresh-card-body"><span class="card-meta">${labelCategory(entry.category)} / ${entry.subCategory}</span><h3>${entry.title}</h3><p>${entry.summary}</p></div><div class="fresh-card-footer">${actions(entry.id)}${sourceMeta(entry)}</div></article>`).join("")}</div></section><section class="today-continue" aria-label="继续学习"><span class="panel-label">继续学习</span><div class="focus-list">${continueItems.map(entry => `<div class="focus-row"><strong>${labelCategory(entry.category) || entry.language}</strong><span>${entry.title || entry.expression}</span></div>`).join("")}</div></section>`;
}
function renderObserve() {
  const filters = ["All", "Self-media", "Design", "K-Hiphop", "AI", "E-commerce"];
  const items = content.filter(entry => entry.page === "observe" && (state.observeFilter === "All" || entry.category === state.observeFilter));
  document.querySelector("#observe").innerHTML = `<span class="page-kicker">观察</span><h1 id="observe-title" class="page-title">观察，而不是追逐。</h1><p class="page-subtitle">围绕自媒体、审美与设计、K-Hiphop、AI 和电商，整理值得理解的信号。</p><div class="toolbar">${filters.map(filter => `<button class="chip ${state.observeFilter === filter ? "active" : ""}" data-filter="${filter}">${filter === "All" ? "全部" : labelCategory(filter)}</button>`).join("")}</div><div class="content-grid">${items.map(observeCard).join("")}</div>`;
}
function observeCard(entry) { return `<article class="item-card observe-card">${imageBlock(entry)}<span class="card-meta">${labelCategory(entry.category)} / ${entry.subCategory}</span><h3>${entry.title}</h3><p>${entry.summary}</p><div class="what-why"><span><strong>发生了什么：</strong> ${entry.what}</span><span><strong>为什么重要：</strong> ${entry.why}</span><span><strong>你可以记住：</strong> ${entry.takeaway}</span></div>${entry.aiNote ? `<div class="editor-note"><span class="editor-mark"></span><p>${entry.aiNote}</p></div>` : ""}${tags(entry.tags)}${sourceMeta(entry)}${actions(entry.id)}</article>`; }
function renderLanguage() {
  const selected = state.languageTab === "korean" ? "Korean" : "English";
  const lessons = (selected === "English" ? languageLessons.english : languageLessons.korean).filter(entry => state.languageFilter === "All" || entry.contentType === state.languageFilter);
  const filterOptions = ["All", "Expression", "Grammar", "Internet", "Culture", "Exam"];
  document.querySelector("#language").innerHTML = `<span class="page-kicker">语言</span><h1 id="language-title" class="page-title">${selected === "English" ? "英语" : "韩语"}</h1><p class="page-subtitle">${selected === "English" ? "围绕自然表达、语感差异、创作和商务场景，做碎片化巩固。" : "围绕 TOPIK 中级、采访、歌词、韩网语和真实文化语境学习。"}</p><div class="toolbar"><button class="chip ${state.languageTab === "english" ? "active" : ""}" data-language="english">English</button><button class="chip ${state.languageTab === "korean" ? "active" : ""}" data-language="korean">Korean</button></div><div class="toolbar" aria-label="语言内容筛选">${filterOptions.map(filter => `<button class="chip ${state.languageFilter === filter ? "active" : ""}" data-language-filter="${filter}">${filter === "All" ? "全部" : labelType(filter)}</button>`).join("")}</div><div class="lesson-grid">${lessons.map(languageCard).join("")}</div>`;
}
function renderLibrary() {
  const saved = state.library.map(normalizeSavedRecord).filter(Boolean);
  const invalidCount = state.library.length - saved.length + state.invalidLibraryRecords.length;
  if (saved.length !== state.library.length) write(libraryV2Key, saved);
  state.library = saved;
  const allTags = [...new Set(saved.flatMap(entry => entry.tags || []))].filter(Boolean).sort();
  const filtered = saved.filter(entry => (state.libraryFilter.page === "All" || entry.page === state.libraryFilter.page || entry.category === state.libraryFilter.page) && (state.libraryFilter.language === "All" || entry.language === state.libraryFilter.language) && (state.libraryFilter.tag === "All" || (entry.tags || []).includes(state.libraryFilter.tag)));
  document.querySelector("#library").innerHTML = `<span class="page-kicker">资料库</span><h1 id="library-title" class="page-title">保存理解，而不只是收藏链接。</h1><p class="page-subtitle">收藏后的内容、来源、标签、偏好和笔记会暂时保存在当前浏览器中。</p><div class="toolbar"><button class="chip ${state.libraryFilter.page === "All" ? "active" : ""}" data-library-page="All">全部</button>${[["today","今日"],["observe","观察"],["Language","语言"]].map(([value,label]) => `<button class="chip ${state.libraryFilter.page === value ? "active" : ""}" data-library-page="${value}">${label}</button>`).join("")}</div><div class="toolbar"><button class="chip ${state.libraryFilter.language === "All" ? "active" : ""}" data-library-language="All">全部语言</button><button class="chip ${state.libraryFilter.language === "English" ? "active" : ""}" data-library-language="English">English</button><button class="chip ${state.libraryFilter.language === "Korean" ? "active" : ""}" data-library-language="Korean">Korean</button></div><div class="toolbar"><button class="chip ${state.libraryFilter.tag === "All" ? "active" : ""}" data-library-tag="All">全部标签</button>${allTags.map(tag => `<button class="chip ${state.libraryFilter.tag === tag ? "active" : ""}" data-library-tag="${tag}">${tag}</button>`).join("")}${invalidCount ? `<button class="text-button" data-clear-invalid="true">清除无效记录</button>` : ""}</div><div class="library-grid"><section>${saved.length ? (filtered.length ? filtered.map(libraryCard).join("") : `<div class="empty-state">没有符合当前筛选条件的内容。</div>`) : `<div class="empty-state"><strong>资料库还是空的。</strong><p>从今日、观察或语言中收藏内容，它们会出现在这里。</p></div>`}</section><aside class="panel"><span class="panel-label">资料库概况</span><div class="saved-count">${saved.length}</div><p class="card-copy">条内容保存在本机</p><div class="focus-list"><div class="focus-row"><strong>感兴趣</strong><span>${countPreference("感兴趣")}</span></div><div class="focus-row"><strong>不感兴趣</strong><span>${countPreference("不感兴趣")}</span></div><div class="focus-row"><strong>不符合我的取向</strong><span>${countPreference("不符合我的取向")}</span></div></div></aside></div>`;
}
function libraryCard(entry) { const note = state.notes[entry.id] || ""; return `<article class="library-card" data-library-id="${entry.id}">${imageBlock(entry)}<span class="card-meta">${labelCategory(entry.category) || entry.language || "资料"}${entry.contentType ? " / " + labelType(entry.contentType) : ""}</span><h3>${entry.title || entry.expression}</h3>${entry.translation ? `<p>${entry.translation}</p>` : ""}${entry.summary ? `<p>${entry.summary}</p>` : ""}${tags(entry.tags || [])}${sourceMeta(entry)}<textarea class="note-input" data-note-id="${entry.id}" placeholder="写下一个简短笔记或关联想法...">${note}</textarea><div class="actions"><button class="text-button" data-save-note="${entry.id}">保存笔记</button><button class="remove-button" data-remove="${entry.id}">删除</button></div></article>`; }

function localizeShell() {
  document.querySelector('[data-page="today"]').textContent = "今日";
  document.querySelector('[data-page="observe"]').textContent = "观察";
  document.querySelector('[data-page="language"]').textContent = "语言";
  document.querySelector('[data-page="library"]').textContent = "资料库";
  document.querySelectorAll('.mobile-nav [data-page="today"]').forEach(item => item.textContent = "今日");
  document.querySelectorAll('.mobile-nav [data-page="observe"]').forEach(item => item.textContent = "观察");
  document.querySelectorAll('.mobile-nav [data-page="language"]').forEach(item => item.textContent = "语言");
  document.querySelectorAll('.mobile-nav [data-page="library"]').forEach(item => item.textContent = "资料库");
  const note = document.querySelector(".sidebar-note");
  if (note) note.innerHTML = `<span>本地 MVP</span><small>偏好、收藏和笔记暂时保存在当前浏览器中。</small>`;
}

const stabilityBaseBindActions = bindActions;
bindActions = function bindStabilityActions() {
  stabilityBaseBindActions();
  document.querySelectorAll("[data-clear-invalid]").forEach(button => button.addEventListener("click", clearInvalidLibraryRecords));
};

migrateLibraryStorage();
render();
localizeShell();
bindActions();
