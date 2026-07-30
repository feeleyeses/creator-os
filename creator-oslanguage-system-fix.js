const productLabels = {
  categories: { "Self-media": "Self-media", Design: "Design", "K-Hiphop": "K-Hiphop", AI: "AI", "E-commerce": "E-commerce", Language: "Language" },
  types: { All: "All", Expression: "Expression", Grammar: "Grammar", Internet: "Internet", Culture: "Culture", Exam: "Exam" },
  prefs: ["Interested", "Not interested", "Not my taste"]
};

const chineseContent = {
  "today-ai-commerce": { title: "小红书店铺开始把 AI 图文当成日常货架能力", summary: "AI 商品图不再只是营销噱头，而是在进入日常货架运营：场景图、标题测试和问答内容都可以更快迭代。", what: "小型店铺正在用 AI 更快生成商品语境内容。", why: "当内容生产成本下降，真正稀缺的会变成选题判断、审美一致性和品牌记忆。", takeaway: "不要只看图片像不像真的，要看 AI 输出是否帮助店铺形成稳定的销售表达。", aiNote: "重点不是工具本身，而是经营者如何把工具变成日常判断。" },
  "today-khh-producer-tag": { title: "Producer tag 正在变成短视频记忆点", summary: "producer tag、音色和第一句歌词都可能比副歌更早建立识别度。", what: "制作人身份正在通过声音标记被用户快速记住。", why: "短视频时代，越早建立声音身份，越容易被截取、传播和再次识别。", takeaway: "以后听歌时，先留意第一句最容易辨认的声音，不要只等副歌。", aiNote: "这是声音身份问题，图片不会比听觉线索更能解释它。" },
  "today-packaging-system": { title: "低饱和包装不等于“性冷淡”", summary: "K-beauty 包装常用低饱和颜色、窄文本栏和材质对比，让信息看起来更容易呼吸。", what: "视觉克制并不等于信息贫乏。", why: "货架和商品页都需要让用户快速建立信任，而不是被视觉噪音压住。", takeaway: "看包装时先分析层级、留白和材质线索，不要只收集配色。", aiNote: "这个案例需要真实图片，因为包装层级必须能被直接观察。" }
};

const observeChinese = {
  "obs-self-xhs-search": ["小红书笔记越来越像搜索结果页", "强笔记会先回答一个明确问题，再展示个人风格。", "创作者开始围绕问题、比较和证据组织笔记。", "搜索型发现奖励清晰答案，而不是模糊的生活方式表达。", "第一屏先像答案，再加入你的声音。"],
  "obs-self-instagram-carousel": ["Instagram carousel 正在变成迷你编辑格式", "轮播内容有效时，每一页都推进一个观点，而不是重复同一句标题。", "滑动结构创造了轻量阅读节奏。", "它让创作者不用一开始就要求用户读长文，也能完成解释。", "把轮播规划成观点、证据、例子和值得保存的结尾。"],
  "obs-self-youtube-retention": ["YouTube 开场正在从寒暄变成承诺", "更好的开场会快速说明观众看完后能理解什么。", "开场句越来越像和观众签下的学习契约。", "观众会很快判断这个视频是否尊重他们的时间。", "先说清楚收获，再展示个性。"],
  "obs-self-content-pillars": ["内容支柱应该像视角，而不是盒子", "僵硬的内容支柱会让账号重复；好的视角能让同一主题连接不同需求。", "创作者正在按用户任务组织内容，而不只是按格式组织内容。", "这样既能保持一致，又不会压扁好奇心。", "先命名视角：学习、比较、决定、应用或收藏。"],
  "obs-self-creator-business": ["创作者产品需要先解释，再说服", "模板、课程和指南类产品，先说明问题和适配对象，转化会更自然。", "数字产品页正在借用文章式结构。", "用户必须先知道这是不是给自己的，才会关心价格。", "销售前先讲清楚使用场景、适合谁、边界和结果。"],
  "obs-design-packaging": ["包装信任来自信息层级", "好的包装让用户不用寻找，就能看见品牌、品类、核心利益和证明。", "信息顺序本身在承担情绪工作。", "不困惑，往往就是信任的开始。", "分析包装时，先列出它要求你最先读的三个信息。"],
  "obs-design-typography": ["韩文字体承载文化节奏", "韩文字形可以通过组合和间距传递年代感、语气和品牌类别。", "字形既是文化表面，也是阅读导航。", "字体常常比颜色更快告诉你一个设计是现代、怀旧还是高级。", "研究字距和组合方式，不要只问字体名称。"],
  "obs-design-branding": ["安静品牌也需要一个可记忆信号", "极简系统失败，常常是因为每个元素都太安静。", "品牌需要一个具体的形状、节奏、颜色或语言钩子。", "识别依赖对比，而不是装饰。", "问自己：当版式变化后，什么元素还会被认出来？"],
  "obs-design-editorial": ["编辑式版式能降低阅读压力", "留白、短摘要和清楚的段落节奏，会让复杂主题更容易进入。", "版式本身成为阅读辅助。", "好层级会在内容开始前先保护注意力。", "用间距告诉读者什么最重要。"],
  "obs-design-ui": ["好用的 UI 安静，是因为选择被收束了", "信息密集的工具也可以很平静，只要每一屏有清楚的主要任务。", "界面正在减少同一时刻暴露给用户的选项。", "重复使用时，减少同时决策比视觉装饰更重要。", "围绕下一步行动设计，而不是一次展示所有可能。"],
  "obs-khh-music": ["K-Hiphop 的 hook 常常早于副歌出现", "音色、tag、ad-lib 和第一句歌词都可能成为记忆点。", "hook 不再只是旋律问题。", "短视频传播奖励更早出现的身份线索。", "听歌时先找第一个可识别声音，而不是只等副歌。"],
  "obs-khh-culture": ["Crew 身份在单曲发现时代仍然重要", "即使用户单独发现歌曲，crew 和厂牌关系仍能解释审美群落。", "声音感知被社交语境塑造。", "这能帮助听众理解制作人、合作对象和视觉风格之间的连接。", "追踪关系，而不只是追踪艺人。"],
  "obs-khh-industry": ["音乐节阵容是受众桥梁地图", "同台名单会显示哪些艺人被放在相邻听众之间。", "阵容不是简单列表，而是市场地图。", "它展示场景如何制造相邻性。", "把排序和搭配当成产业信号来读。"],
  "obs-khh-visual": ["封面视觉正在靠近编辑式克制", "摄影、窄字排和较低对比，让一些发行更像生活方式内容。", "部分 K-Hiphop 视觉不再只追求海报感。", "它需要同时适配缩略图、信息流和周边。", "先在缩略图尺寸下比较封面。"],
  "obs-khh-language": ["歌词教的是语域，不只是词义", "俚语、敬语省略和称呼方式会暴露说话人的距离和姿态。", "语言选择在定位说话者。", "只翻译意思，会漏掉语气和身份。", "标注谁在对谁说话，以及他们之间的距离。"],
  "obs-ai-workflow": ["AI workflow 的价值始于任务边界", "关键不是工具能做多少，而是它应该做什么、停在哪里、何时交还给人。", "边界正在成为产品质量。", "用户更信任知道何时停止的工具。", "优化 prompt 前，先定义交接点。"],
  "obs-ai-tool": ["单一用途 AI 工具更容易被评估", "一个窄的图片、笔记或研究工具，比宽泛助手更容易通过反复使用判断质量。", "AI 工具正在围绕具体工作流专业化。", "具体任务让质量变得可见。", "用重复使用来评估，而不是用 demo 惊艳度。"],
  "obs-ai-product": ["AI UI 应该暴露信心和来源路径", "用户需要知道哪些是推断、哪些有来源、哪些仍不确定。", "透明度正在变成界面工作。", "这能避免生成文本像没有依据的权威。", "把来源放在次级界面里，而不是堆成免责声明。"],
  "obs-ai-industry": ["AI 采用正在从实验走向运营", "团队正在从 demo 转向可重复的内部流程。", "AI 进入的是日常操作，而不只是发布会。", "流程匹配比功能新鲜更重要。", "问本周哪个工作被改变了，而不是哪个模型发布了。"],
  "obs-ai-case": ["AI 商品摄影需要明确约束", "品牌色、角度、材质和使用场景越清楚，生成图片越容易保持一致。", "prompt 正在变成 art direction。", "视觉一致性来自约束，而不是更长的咒语。", "像写设计 brief 一样写图片 brief。"],
  "obs-ecom-product-page": ["商品页正在变成解释页", "好的商品页会先说明问题、适配对象、证据和下一步行动，再制造紧迫感。", "电商文案正在吸收编辑结构。", "理解会减少犹豫。", "让用户先感到被定位，再要求购买。"],
  "obs-ecom-content-commerce": ["内容电商成立的前提是内容本身有用", "只推商品的帖子会显得薄；有用的上下文会先建立信任。", "内容和商业正在合流。", "没有理解时，用户会抵触销售。", "先给一个有用视角，再给产品链接。"],
  "obs-ecom-trust": ["信任线索不只是评论", "尺码清晰、退换规则、成分解释和对比图都会降低风险。", "信任由很多小细节共同建立。", "未回答的疑虑会阻断转化。", "先列出买家担心什么，再添加说服。"],
  "obs-ecom-branding": ["平台品牌需要价格之外的记忆", "可重复的视觉或语言系统，能让商品在比价中留下印象。", "品牌资产正在成为转化资产。", "只靠价格的位置很脆弱。", "找出折扣消失后仍能被记住的线索。"],
  "obs-ecom-conversion": ["转化体验依赖决策顺序", "让用户同时选规格、信任卖家、比较利益和付款，会制造阻力。", "好的电商 UX 会分阶段安排决策。", "降低认知负担，有时比更强文案更有效。", "把选择、证明和购买拆成不同瞬间。"]
};

Object.entries(chineseContent).forEach(([id, fields]) => Object.assign(findCurrentContent(id) || {}, fields));
Object.entries(observeChinese).forEach(([id, values]) => {
  const item = findCurrentContent(id);
  if (item) Object.assign(item, { title: values[0], summary: values[1], what: values[2], why: values[3], takeaway: values[4] });
});

function labelCategory(value) { return productLabels.categories[value] || value || ""; }
function labelType(value) { return productLabels.types[value] || value || ""; }
function sourceFromItem(item) { return item.source || (item.page === "language" || item.category === "Language" ? "language" : item.page || ""); }
function savedSnapshot(item) {
  if (!item) return null;
  return { id: item.id, source: sourceFromItem(item), language: item.language || "", category: item.category || "", tags: item.tags || [], title: item.title || "", expression: item.expression || item.phrase || "", translation: item.translation || "", summary: item.summary || item.shortExplanation || "", image: item.imageUrl || "", imageUrl: item.imageUrl || "", imageAlt: item.imageAlt || "", sourceName: item.sourceName || "", sourceUrl: item.sourceUrl || "", sourceType: item.sourceType || "", author: item.author || "", publishedAt: item.publishedAt || "", savedAt: item.savedAt || new Date().toISOString(), note: item.note || "", preference: item.preference || "", page: item.page || "", contentType: item.contentType || "" };
}
function normalizeSavedRecord(record) {
  if (!record || !record.id) return null;
  const current = findCurrentContent(record.id);
  const merged = { ...(current || {}), ...record, source: record.source || sourceFromItem(current || record) };
  if (!hasRenderableContent(merged)) return null;
  return savedSnapshot(merged);
}
function sourceMeta(entry) {
  if (!entry || (!entry.sourceName && !entry.sourceUrl)) return "";
  const details = [entry.sourceName, entry.sourceType, entry.author ? `Author: ${entry.author}` : "", entry.publishedAt ? `Published: ${entry.publishedAt}` : ""].filter(Boolean).join(" &#183; ");
  return `<div class="source-meta">${details ? `<span>${details}</span>` : ""}${entry.sourceUrl ? `<a class="source-link" href="${entry.sourceUrl}" target="_blank" rel="noopener noreferrer">Source &#8599;</a>` : ""}</div>`;
}
function actions(id) {
  const preference = state.preferences[id] || "";
  const saved = isSaved(id);
  return `<div class="actions" data-actions="${id}"><button class="save-button ${saved ? "saved" : ""}" data-save="${id}">${saved ? "Saved" : "Save to Library"}</button>${productLabels.prefs.map(label => `<button class="action-button ${preference === label ? "active" : ""}" data-preference="${id}" data-value="${label}">${label}</button>`).join("")}</div>`;
}
function toggleSave(id) {
  if (isSaved(id)) state.library = state.library.filter(item => item.id !== id);
  else {
    const snapshot = savedSnapshot(findCurrentContent(id));
    if (snapshot) state.library = [snapshot, ...state.library.filter(item => item.id !== id)];
  }
  write(libraryV2Key, state.library);
  render();
}
function setPreference(id, value) {
  state.preferences[id] = state.preferences[id] === value ? "" : value;
  const saved = state.library.find(item => item.id === id);
  if (saved) { saved.preference = state.preferences[id]; write(libraryV2Key, state.library); }
  write(storageKeys.preferences, state.preferences);
  render();
}

function renderToday() {
  const focus = content.find(entry => entry.contentType === "Focus");
  const fresh = content.filter(entry => entry.page === "today" && entry.contentType === "Fresh Find").slice(0, 2);
  const continueItems = [languageLessons.english[0], languageLessons.korean[0], content.find(entry => entry.page === "observe")].filter(Boolean);
  document.querySelector("#today").innerHTML = `<div class="today-editor-opening" aria-label="Editor's Opening"><span class="page-kicker">EDITOR'S OPENING</span><p id="today-title">今天，先看一件真正值得理解的事。</p></div><article class="today-focus" aria-label="Today's Focus"><div class="today-focus-copy"><span class="panel-label">TODAY'S FOCUS</span><h1>${focus.title}</h1><p>${focus.summary}</p></div><div class="today-focus-aside"><span>Why it matters</span><p>${focus.aiNote}</p>${tags(focus.tags)}${actions(focus.id)}${sourceMeta(focus)}</div></article><section class="today-section" aria-label="Fresh Finds"><div class="today-section-heading"><span class="panel-label">FRESH FINDS</span></div><div class="fresh-grid">${fresh.map(entry => `<article class="fresh-card">${imageBlock(entry)}<div class="fresh-card-body"><span class="card-meta">${labelCategory(entry.category)} / ${entry.subCategory}</span><h3>${entry.title}</h3><p>${entry.summary}</p></div><div class="fresh-card-footer">${actions(entry.id)}${sourceMeta(entry)}</div></article>`).join("")}</div></section><section class="today-continue" aria-label="Continue Learning"><span class="panel-label">CONTINUE LEARNING</span><div class="focus-list">${continueItems.map(entry => `<div class="focus-row"><strong>${labelCategory(entry.category) || entry.language}</strong><span>${entry.title || entry.expression}</span></div>`).join("")}</div></section>`;
}
function renderObserve() {
  const filters = ["All", "Self-media", "Design", "K-Hiphop", "AI", "E-commerce"];
  const items = content.filter(entry => entry.page === "observe" && (state.observeFilter === "All" || entry.category === state.observeFilter));
  document.querySelector("#observe").innerHTML = `<span class="page-kicker">Observe</span><h1 id="observe-title" class="page-title">Observe, do not chase.</h1><p class="page-subtitle">把分散的信号整理成可以理解、可以复用的观察。</p><div class="toolbar">${filters.map(filter => `<button class="chip ${state.observeFilter === filter ? "active" : ""}" data-filter="${filter}">${filter === "All" ? "All" : labelCategory(filter)}</button>`).join("")}</div><div class="content-grid">${items.map(observeCard).join("")}</div>`;
}
function observeCard(entry) { return `<article class="item-card observe-card">${imageBlock(entry)}<span class="card-meta">${labelCategory(entry.category)} / ${entry.subCategory}</span><h3>${entry.title}</h3><p>${entry.summary}</p><div class="what-why"><span><strong>What happened</strong><br>${entry.what}</span><span><strong>Why it matters</strong><br>${entry.why}</span><span><strong>Remember this</strong><br>${entry.takeaway}</span></div>${entry.aiNote ? `<div class="editor-note"><span class="editor-mark"></span><p>${entry.aiNote}</p></div>` : ""}${tags(entry.tags)}${sourceMeta(entry)}${actions(entry.id)}</article>`; }
function renderLanguage() {
  const selected = state.languageTab === "korean" ? "Korean" : "English";
  const lessons = (selected === "English" ? languageLessons.english : languageLessons.korean).filter(entry => state.languageFilter === "All" || entry.contentType === state.languageFilter);
  const filterOptions = ["All", "Expression", "Grammar", "Internet", "Culture", "Exam"];
  document.querySelector("#language").innerHTML = `<span class="page-kicker">Language</span><h1 id="language-title" class="page-title">Language is a window.</h1><p class="page-subtitle">${selected === "English" ? "用英语巩固自然表达、语感差异和真实创作语境。" : "用韩语连接 TOPIK 中级、采访、歌词、韩网语和文化语境。"}</p><div class="toolbar"><button class="chip ${state.languageTab === "english" ? "active" : ""}" data-language="english">English</button><button class="chip ${state.languageTab === "korean" ? "active" : ""}" data-language="korean">Korean</button></div><div class="toolbar" aria-label="Language filters">${filterOptions.map(filter => `<button class="chip ${state.languageFilter === filter ? "active" : ""}" data-language-filter="${filter}">${labelType(filter)}</button>`).join("")}</div><div class="lesson-grid">${lessons.map(languageCard).join("")}</div>`;
}
function languageCard(entry) {
  const expanded = Boolean(state.expandedLessons[entry.id]);
  const point = renderLearningPoint(entry);
  return `<article class="lesson-card language-card" data-lesson-id="${entry.id}"><span class="card-meta">${entry.difficulty} / ${labelType(entry.contentType)}</span><h3>${entry.expression}</h3><div class="lesson-translation"><strong>Meaning</strong><p>${entry.translation}</p></div><p class="lesson-short">${entry.shortExplanation}</p>${point}<div class="actions">${actions(entry.id)}<button class="text-button lesson-toggle" type="button" data-lesson-toggle="${entry.id}" aria-expanded="${expanded}">${expanded ? "Collapse" : "Expand"}</button></div>${expanded ? renderExpandedLesson(entry) : ""}</article>`;
}
function renderExpandedLesson(entry) {
  return `<div class="lesson-expanded">${entry.realContext ? `<section class="lesson-block"><h4>Context</h4><p>${entry.realContext}</p></section>` : ""}${entry.usage ? `<section class="lesson-block"><h4>Usage</h4><p>${entry.usage}</p></section>` : ""}${entry.whenNotToUse ? `<section class="lesson-block"><h4>Avoid</h4><p>${entry.whenNotToUse}</p></section>` : ""}${renderPairList("Keywords", entry.vocabulary, "term", "meaning")}${renderPairList("Grammar", entry.grammarPoints, "point", "explanation")}${renderExamples(entry.examples)}${entry.nuance ? `<section class="lesson-block"><h4>Nuance</h4><p>${entry.nuance}</p></section>` : ""}${entry.aiNote ? `<section class="lesson-block lesson-ai-note"><h4>Remember this</h4><p>${entry.aiNote}</p></section>` : ""}${sourceMeta(entry)}</div>`;
}
function renderExamples(examples) {
  const rows = (examples || []).filter(example => example && example.original && example.translation);
  if (!rows.length) return "";
  return `<section class="lesson-block"><h4>Example</h4>${rows.map(example => `<div class="example-row"><p class="example-original">${example.original}</p><p>${example.translation}</p>${example.note ? `<small>${example.note}</small>` : ""}</div>`).join("")}</section>`;
}
function renderLibrary() {
  state.library = state.library.map(normalizeSavedRecord).filter(Boolean);
  write(libraryV2Key, state.library);
  const saved = state.library;
  const allTags = [...new Set(saved.flatMap(entry => entry.tags || []))].filter(Boolean).sort();
  const filtered = saved.filter(entry => (state.libraryFilter.source === "All" || entry.source === state.libraryFilter.source) && (state.libraryFilter.language === "All" || entry.language === state.libraryFilter.language) && (state.libraryFilter.tag === "All" || (entry.tags || []).includes(state.libraryFilter.tag)));
  document.querySelector("#library").innerHTML = `<span class="page-kicker">Library</span><h1 id="library-title" class="page-title">Saved knowledge, not just bookmarks.</h1><p class="page-subtitle">保存后的内容会保留来源、标签、笔记和偏好，方便以后继续理解。</p><div class="toolbar"><button class="chip ${state.libraryFilter.source === "All" ? "active" : ""}" data-library-source="All">All</button>${[["today","Today"],["observe","Observe"],["language","Language"]].map(([value,label]) => `<button class="chip ${state.libraryFilter.source === value ? "active" : ""}" data-library-source="${value}">${label}</button>`).join("")}</div><div class="toolbar"><button class="chip ${state.libraryFilter.language === "All" ? "active" : ""}" data-library-language="All">All languages</button><button class="chip ${state.libraryFilter.language === "English" ? "active" : ""}" data-library-language="English">English</button><button class="chip ${state.libraryFilter.language === "Korean" ? "active" : ""}" data-library-language="Korean">Korean</button></div><div class="toolbar"><button class="chip ${state.libraryFilter.tag === "All" ? "active" : ""}" data-library-tag="All">All tags</button>${allTags.map(tag => `<button class="chip ${state.libraryFilter.tag === tag ? "active" : ""}" data-library-tag="${tag}">${tag}</button>`).join("")}${state.invalidLibraryRecords.length ? `<button class="text-button" data-clear-invalid="true">Clear invalid records</button>` : ""}</div><div class="library-grid"><section>${saved.length ? (filtered.length ? filtered.map(libraryCard).join("") : `<div class="empty-state">没有符合当前筛选条件的内容。</div>`) : `<div class="empty-state"><strong>资料库还是空的。</strong><p>从 Today、Observe 或 Language 中保存内容，它们会出现在这里。</p></div>`}</section><aside class="panel"><span class="panel-label">Library State</span><div class="saved-count">${saved.length}</div><p class="card-copy">items saved locally</p><div class="focus-list"><div class="focus-row"><strong>Interested</strong><span>${countPreference("Interested")}</span></div><div class="focus-row"><strong>Not interested</strong><span>${countPreference("Not interested")}</span></div><div class="focus-row"><strong>Not my taste</strong><span>${countPreference("Not my taste")}</span></div></div></aside></div>`;
}
function libraryCard(entry) { const note = state.notes[entry.id] || entry.note || ""; return `<article class="library-card" data-library-id="${entry.id}">${imageBlock(entry)}<span class="card-meta">${entry.source || "library"} / ${labelCategory(entry.category) || entry.language || "Knowledge"}${entry.contentType ? " / " + labelType(entry.contentType) : ""}</span><h3>${entry.title || entry.expression}</h3>${entry.translation ? `<p>${entry.translation}</p>` : ""}${entry.summary ? `<p>${entry.summary}</p>` : ""}${tags(entry.tags || [])}${sourceMeta(entry)}<textarea class="note-input" data-note-id="${entry.id}" placeholder="Add a short note or connection...">${note}</textarea><div class="actions"><button class="text-button" data-save-note="${entry.id}">Save note</button><button class="remove-button" data-remove="${entry.id}">Remove</button></div></article>`; }
function localizeShell() {
  const labels = { today: "Today", observe: "Observe", language: "Language", library: "Library" };
  Object.entries(labels).forEach(([page, label]) => document.querySelectorAll(`.nav-list [data-page="${page}"], .mobile-nav [data-page="${page}"]`).forEach(item => item.textContent = label));
  const brand = document.querySelector(".brand");
  if (brand) brand.innerHTML = `<span>Creator</span><strong>OS</strong>`;
  const note = document.querySelector(".sidebar-note");
  if (note) note.innerHTML = `<span>Local MVP</span><small>Saved taste, library, and notes stay in this browser for now.</small>`;
}

state.libraryFilter = { source: state.libraryFilter.source || state.libraryFilter.page || "All", language: state.libraryFilter.language || "All", tag: state.libraryFilter.tag || "All" };
state.library = state.library.map(normalizeSavedRecord).filter(Boolean);
write(libraryV2Key, state.library);
const languageSystemBaseBindActions = bindActions;
bindActions = function bindLanguageSystemActions() {
  languageSystemBaseBindActions();
  document.querySelectorAll("[data-library-source]").forEach(button => button.addEventListener("click", () => { state.libraryFilter.source = button.dataset.librarySource; renderLibrary(); bindActions(); }));
};
render();
localizeShell();
bindActions();
