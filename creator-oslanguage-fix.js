const uiLabels = {
  All: "全部",
  Expression: "表达",
  Grammar: "语法",
  Internet: "网络用语",
  Culture: "文化",
  Exam: "考试",
  Source: "查看来源"
};

state.expandedLessons = state.expandedLessons || {};
state.languageFilter = state.languageFilter || "All";

const structuredLesson = (data) => ({
  id: "",
  page: "language",
  category: "Language",
  subCategory: "",
  language: "English",
  contentType: "Expression",
  difficulty: "中高级",
  expression: "",
  translation: "",
  shortExplanation: "",
  realContext: "",
  usage: "",
  whenNotToUse: "",
  vocabulary: [],
  grammarPoints: [],
  examples: [],
  nuance: "",
  aiNote: "",
  tags: [],
  sourceName: "",
  sourceUrl: "",
  sourceType: "",
  author: "",
  publishedAt: "",
  ...data
});

const languageMvpLessons = [
  structuredLesson({ id: "en-shaping-idea", language: "English", contentType: "Expression", difficulty: "中级", expression: "I'm still shaping the idea.", translation: "我还在把这个想法整理成型。", shortExplanation: "用来说明你不是没有想法，而是还在整理结构和表达方式。", realContext: "内容策划、设计讨论、项目早期沟通。", usage: "适合在想法未定稿时使用，比 I don't know 更主动。", whenNotToUse: "如果完全没有方向，或对方需要立即明确答案，就不要用它拖延。", vocabulary: [{ term: "shape", meaning: "使想法成型、塑造方向" }], grammarPoints: [{ point: "be still + -ing", explanation: "强调动作仍在进行，语气比一般现在时更柔和。" }], examples: [{ original: "I'm still shaping the idea, but the core is about reducing reading pressure.", translation: "我还在整理这个想法，但核心是降低阅读压力。", note: "适合创作或产品讨论中的半成品表达。" }], nuance: "shaping 暗示你正在做判断和取舍，不是随便想想。", aiNote: "这类表达能保护未完成思考，同时让你听起来仍然有推进感。", tags: ["Creator", "表达", "collocation"], sourceName: "Cambridge Dictionary: shape", sourceUrl: "https://dictionary.cambridge.org/us/dictionary/english/shape", sourceType: "dictionary", author: "Cambridge University Press" }),
  structuredLesson({ id: "en-nuance-not-quite", language: "English", contentType: "Expression", difficulty: "中级", expression: "It's not quite what I meant.", translation: "这不完全是我的意思。", shortExplanation: "一种温和纠偏：对方接近了，但还没有准确抓到你的意思。", realContext: "反馈、改稿、协作讨论。", usage: "先承认接近，再补充你真正想表达的重点。", whenNotToUse: "如果对方完全误解，或情况需要直接指出错误，就不要过度软化。", vocabulary: [{ term: "not quite", meaning: "不完全是，还差一点准确度" }], examples: [{ original: "It's not quite what I meant. I was talking about tone, not color.", translation: "这不完全是我的意思。我说的是语气，不是颜色。", note: "后一句最好补清楚差异点。" }], nuance: "not quite 修正的是精确度；not really 更像是在否定整个方向。", aiNote: "适合训练英语里的低冲突反馈。", tags: ["反馈", "nuance"] }),
  structuredLesson({ id: "en-collocation-build-on", language: "English", contentType: "Expression", difficulty: "中级", expression: "Can I build on that?", translation: "我可以接着这个想法往下说吗？", shortExplanation: "表示你要延展别人的观点，而不是另起炉灶。", realContext: "会议、课堂讨论、头脑风暴。", usage: "用于加入补充观点，让协作语气更顺。", whenNotToUse: "如果你实际是在反驳，先说明分歧，不要伪装成补充。", vocabulary: [{ term: "build on", meaning: "基于已有内容继续发展" }], examples: [{ original: "Can I build on that? The same logic also applies to Library.", translation: "我可以接着这个想法往下说吗？同样的逻辑也适用于 Library。" }], nuance: "build on 带有合作感，比 add something 更有结构。", aiNote: "很适合 creator/business 场景里的自然接话。", tags: ["Business", "Creator", "collocation"] }),
  structuredLesson({ id: "en-internet-lowkey", language: "English", contentType: "Internet", difficulty: "中级", expression: "I'm low-key obsessed with this layout.", translation: "我有点暗暗喜欢这个版式。", shortExplanation: "low-key 可以把强烈感受说得更轻、更随意。", realContext: "社交媒体评论、朋友聊天、非正式创作笔记。", usage: "用于轻松表达喜欢、惊讶或在意。", whenNotToUse: "正式写作、考试和严肃商务场景里不建议使用。", vocabulary: [{ term: "low-key", meaning: "低调地、有点、暗暗地" }], examples: [{ original: "This title is low-key better than the original one.", translation: "这个标题其实有点比原来的更好。", note: "语气轻，不像正式评价。" }], nuance: "它常常表达“我知道这不是什么大事，但我真的有感觉”。", aiNote: "适合理解英文互联网语气，而不是只背中文对应词。", tags: ["Internet", "语气"] }),
  structuredLesson({ id: "en-grammar-would-rather", language: "English", contentType: "Grammar", difficulty: "中级", expression: "I'd rather make it clearer than make it louder.", translation: "我宁愿让它更清楚，而不是更抢眼。", shortExplanation: "用 would rather 表达取舍，比直接说 I want 更有判断感。", realContext: "设计反馈、产品取舍、内容编辑。", usage: "用来说明你更重视 A，而不是 B。", whenNotToUse: "如果只是普通喜好，不涉及取舍，可以用 prefer。", grammarPoints: [{ point: "would rather + verb + than + verb", explanation: "两个动词保持原形，用 than 引出被放弃的选项。" }], examples: [{ original: "I'd rather publish one clear note than five vague updates.", translation: "我宁愿发一条清楚的笔记，也不想发五条模糊的更新。" }], nuance: "它不是单纯偏好，而是在表达优先级。", aiNote: "适合把审美判断说成可讨论的策略选择。", tags: ["Grammar", "Design"] }),
  structuredLesson({ id: "en-business-scope", language: "English", contentType: "Expression", difficulty: "中高级", expression: "This is starting to become scope creep.", translation: "这开始有点范围蔓延了。", shortExplanation: "scope creep 指项目需求不断外扩，超过原本边界。", realContext: "项目管理、自由职业、产品讨论。", usage: "用于提醒团队收住范围，并回到原始目标。", whenNotToUse: "不要把它当作拒绝一切新想法的借口。", vocabulary: [{ term: "scope", meaning: "项目范围" }, { term: "creep", meaning: "缓慢蔓延" }], examples: [{ original: "Adding a dashboard now would be scope creep for this sprint.", translation: "现在加仪表盘会让这个 sprint 的范围蔓延。" }], nuance: "starting to become 比直接说 is scope creep 更缓和。", aiNote: "这是保护工作边界的高频表达。", tags: ["Business", "项目"] }),
  structuredLesson({ id: "en-practical-pushback", language: "English", contentType: "Expression", difficulty: "中高级", expression: "I see the point, but I'm not sure it solves the core problem.", translation: "我理解这个点，但不确定它解决了核心问题。", shortExplanation: "先承认合理性，再把讨论拉回核心问题。", realContext: "团队讨论、评审、方案取舍。", usage: "用于温和反对一个不够聚焦的方案。", whenNotToUse: "如果需要快速决策，句子可能显得太绕。", vocabulary: [{ term: "core problem", meaning: "核心问题，而不是表面症状" }], examples: [{ original: "I see the point, but I'm not sure it solves the core problem for new users.", translation: "我理解这个点，但不确定它解决了新用户的核心问题。" }], nuance: "I see the point 不是完全同意，而是承认对方有理由。", aiNote: "适合练习不生硬的英文 pushback。", tags: ["反馈", "Business"] }),
  structuredLesson({ id: "en-exam-concession", language: "English", contentType: "Exam", difficulty: "中高级", expression: "While convenience matters, trust is the real barrier.", translation: "便利性固然重要，但信任才是真正的障碍。", shortExplanation: "while 引出让步，主句放真正观点。", realContext: "CET 写作、趋势分析、报告段落。", usage: "用于让论证显得平衡，但重点仍然清楚。", whenNotToUse: "如果前后两点没有真实对比，就不要硬套 while。", grammarPoints: [{ point: "While + clause, main claim", explanation: "从句让步，主句表达真正立场。" }], examples: [{ original: "While speed matters, consistency is what makes the workflow usable.", translation: "速度固然重要，但一致性才让这个工作流真正可用。" }], nuance: "这个结构能避免作文里只会说 however。", aiNote: "适合把考试句型迁移到真实分析表达。", tags: ["Exam", "argument"] }),

  structuredLesson({ id: "ko-not-my-taste", language: "Korean", contentType: "Expression", difficulty: "TOPIK 2-3", expression: "제 취향은 아니에요.", translation: "这不太是我的取向 / 不是我的菜。", shortExplanation: "礼貌表达“不喜欢”，但不把对象评价成不好。", realContext: "聊音乐、穿搭、设计、食物时都能用。", usage: "想保持礼貌和距离时使用。", whenNotToUse: "正式评价里需要给客观理由时，不要只说这句。", vocabulary: [{ term: "취향", meaning: "取向、偏好、审美口味" }], grammarPoints: [{ point: "noun + 은/는 아니에요", explanation: "表示“不是某种东西/类型”，语气比 싫어요 更柔和。" }], examples: [{ original: "이 노래가 나쁘진 않은데 제 취향은 아니에요.", translation: "这首歌不是不好，但不太是我的取向。", note: "先否定“坏”，再说明个人偏好。" }], nuance: "취향 带有身份和审美倾向，不只是简单喜欢。", aiNote: "K-pop/K-Hiphop 讨论里很常用，因为很多评价其实是在说取向。", tags: ["Culture", "K-Hiphop"] }),
  structuredLesson({ id: "ko-kind-of", language: "Korean", contentType: "Grammar", difficulty: "TOPIK 2-3", expression: "저는 가사를 먼저 보는 편이에요.", translation: "我属于会先看歌词的类型。", shortExplanation: "-는 편이에요 用来描述倾向，不把话说得太绝对。", realContext: "自我介绍、采访回答、粉丝聊天。", usage: "描述自己平常比较偏向怎么做。", whenNotToUse: "一次性动作不要用 편이다。", vocabulary: [{ term: "가사", meaning: "歌词" }, { term: "먼저", meaning: "先、首先" }], grammarPoints: [{ point: "verb/adjective + 편이다", explanation: "表示“算是比较……的一类/倾向于……”。" }], examples: [{ original: "저는 새로운 앨범이 나오면 가사를 먼저 보는 편이에요.", translation: "新专辑出来的时候，我属于会先看歌词的类型。" }], nuance: "比 항상 更自然，因为它给习惯留了弹性。", aiNote: "这是 TOPIK 2-3 很实用的表达，也很适合音乐兴趣场景。", tags: ["TOPIK", "K-Hiphop"] }),
  structuredLesson({ id: "ko-internet-ㅇㅈ", language: "Korean", contentType: "Internet", difficulty: "中级", expression: "이 비트 진짜 ㅇㅈ", translation: "这个 beat 真的认了 / 服。", shortExplanation: "ㅇㅈ 是 인정 的缩写，表示认可、同意、服气。", realContext: "YouTube 评论、直播聊天、社交平台短评。", usage: "只在非常随意的网络语境中使用。", whenNotToUse: "考试、工作、正式对话里不要用缩写。", vocabulary: [{ term: "인정", meaning: "认可、承认、同意" }, { term: "비트", meaning: "beat，节拍/伴奏" }], examples: [{ original: "이 훅은 진짜 ㅇㅈ이에요.", translation: "这个 hook 真的得认。", note: "可以写成完整的 인정이에요，语气稍微更清楚。" }], nuance: "ㅇㅈ 更像弹幕式反应，不适合认真说明理由。", aiNote: "学习韩网语要同时记住场景边界。", tags: ["Internet", "K-Hiphop"] }),
  structuredLesson({ id: "ko-interview-solo", language: "Korean", contentType: "Expression", difficulty: "TOPIK 3", expression: "솔직히 말하면 부담이 있었어요.", translation: "老实说，当时有压力。", shortExplanation: "솔직히 말하면 用来引出比较真实、个人化的回答。", realContext: "艺人采访、纪录片、自我反思。", usage: "放在承认压力、犹豫、真实想法之前。", whenNotToUse: "普通事实前反复使用会显得夸张。", vocabulary: [{ term: "솔직히", meaning: "坦率地、老实说" }, { term: "부담", meaning: "负担、压力" }], examples: [{ original: "솔직히 말하면 처음에는 자신이 없었어요.", translation: "老实说，一开始我没有信心。" }], nuance: "它会把后面的内容标记成“更真实的话”。", aiNote: "适合听懂韩语采访里的情绪转折。", tags: ["Interview", "Culture"] }),
  structuredLesson({ id: "ko-lyric-vibe", language: "Korean", contentType: "Culture", difficulty: "TOPIK 2-3", expression: "이 곡은 분위기가 좋아요.", translation: "这首歌氛围很好。", shortExplanation: "분위기 可以说音乐、空间、照片、人和场面的整体感觉。", realContext: "音乐反应、设计评论、日常聊天。", usage: "当你想评价整体气质，而不是技术细节时使用。", whenNotToUse: "如果需要具体分析旋律、编曲或歌词，不要只停留在 분위기。", vocabulary: [{ term: "분위기", meaning: "氛围、气质、整体感觉" }, { term: "곡", meaning: "歌曲、曲子" }], examples: [{ original: "이 사진은 색감보다 분위기가 더 좋아요.", translation: "这张照片比起色感，更好的是氛围。" }], nuance: "它接近 vibe，但比英文 vibe 更常出现在日常韩语里。", aiNote: "适合理解韩语评价里的“整体感”。", tags: ["Culture", "Design"] }),
  structuredLesson({ id: "ko-daily-ㄹ까요", language: "Korean", contentType: "Grammar", difficulty: "TOPIK 2", expression: "오늘은 이 앨범부터 들어볼까요?", translation: "今天要不要先听这张专辑？", shortExplanation: "-ㄹ까요? 可以提议一起做某事，语气柔和。", realContext: "学习计划、歌单选择、日常建议。", usage: "想提出建议但不强迫对方时使用。", whenNotToUse: "下达明确指令时不要用它。", vocabulary: [{ term: "앨범", meaning: "专辑" }, { term: "들어보다", meaning: "试着听听" }], grammarPoints: [{ point: "verb stem + ㄹ/을까요?", explanation: "动词词干后接 ㄹ까요/을까요，用来询问或提议。" }], examples: [{ original: "다음에는 인터뷰 영상을 같이 봐볼까요?", translation: "下次要不要一起看看采访视频？" }], nuance: "它比 합시다 更轻，也更像邀请。", aiNote: "很适合把语法放进真实学习安排。", tags: ["Grammar", "Daily"] }),
  structuredLesson({ id: "ko-culture-nunchi", language: "Korean", contentType: "Culture", difficulty: "TOPIK 3-4", expression: "눈치가 빠르다", translation: "有眼力见 / 很会察言观色。", shortExplanation: "눈치 指读懂气氛、关系和时机的能力。", realContext: "综艺、职场场景、采访、日常人际关系。", usage: "形容一个人很会看场合、反应快。", whenNotToUse: "不要把它只理解成视力或智力。", vocabulary: [{ term: "눈치", meaning: "察言观色、读气氛的能力" }, { term: "빠르다", meaning: "快、反应快" }], examples: [{ original: "그 사람은 눈치가 빨라서 분위기를 금방 알아요.", translation: "那个人很有眼力见，很快就能读懂气氛。" }], nuance: "它是文化词，直接翻译成 sense 不够完整。", aiNote: "理解 눈치 能帮助你听懂很多韩语综艺和采访里的关系判断。", tags: ["Culture", "Nuance"] }),
  structuredLesson({ id: "ko-exam-because", language: "Korean", contentType: "Exam", difficulty: "TOPIK 3", expression: "시간이 부족하기 때문에 계획이 필요해요.", translation: "因为时间不够，所以需要计划。", shortExplanation: "-기 때문에 是比较正式的原因表达，适合写作和说明。", realContext: "TOPIK 写作、报告、正式解释。", usage: "用于清楚说明原因和结果。", whenNotToUse: "很随意的聊天里可能比 -아서/어서 更书面。", vocabulary: [{ term: "부족하다", meaning: "不足、不够" }, { term: "계획", meaning: "计划" }], grammarPoints: [{ point: "verb/adjective + 기 때문에", explanation: "把谓词名词化后接 때문에，表示原因。" }], examples: [{ original: "연습 시간이 부족하기 때문에 매일 조금씩 공부해야 해요.", translation: "因为练习时间不够，所以需要每天学一点。" }], nuance: "它比 -아서/어서 更适合正式表达和考试作文。", aiNote: "这是 TOPIK 中级写作里很稳定的原因结构。", tags: ["Exam", "Grammar"] })
];

languageLessons.english = languageMvpLessons.filter(lesson => lesson.language === "English");
languageLessons.korean = languageMvpLessons.filter(lesson => lesson.language === "Korean");

function localizeType(type) {
  return uiLabels[type] || type;
}

function sourceMeta(entry) {
  if (!entry.sourceName && !entry.sourceUrl) return "";
  const details = [entry.sourceName, entry.sourceType, entry.author, entry.publishedAt].filter(Boolean).join(" &#183; ");
  return `<div class="source-meta">${details ? `<span>${details}</span>` : ""}${entry.sourceUrl ? `<a class="source-link" href="${entry.sourceUrl}" target="_blank" rel="noopener noreferrer">查看来源 &#8599;</a>` : ""}</div>`;
}

function infoChips(items, className = "info-chip") {
  return (items || []).filter(Boolean).map(item => `<span class="${className}" tabindex="0">${typeof item === "string" ? item : item.point || item.term}</span>`).join("");
}

function renderLearningPoint(entry) {
  const point = (entry.grammarPoints && entry.grammarPoints[0]) || (entry.vocabulary && entry.vocabulary[0]) || (entry.nuance ? { point: "细微语感", explanation: entry.nuance } : null);
  if (!point) return "";
  const label = point.point || point.term;
  const text = point.explanation || point.meaning || entry.nuance;
  return `<div class="lesson-main-point"><span>${label}</span><p>${text}</p></div>`;
}

function renderPairList(title, items, keyName, valueName) {
  const rows = (items || []).filter(item => item && item[keyName] && item[valueName]);
  if (!rows.length) return "";
  return `<section class="lesson-block"><h4>${title}</h4>${rows.map(item => `<div class="lesson-row"><strong>${item[keyName]}</strong><span>${item[valueName]}</span></div>`).join("")}</section>`;
}

function renderExamples(examples) {
  const rows = (examples || []).filter(example => example && example.original && example.translation);
  if (!rows.length) return "";
  return `<section class="lesson-block"><h4>例句</h4>${rows.map(example => `<div class="example-row"><p class="example-original">${example.original}</p><p>${example.translation}</p>${example.note ? `<small>${example.note}</small>` : ""}</div>`).join("")}</section>`;
}

function renderExpandedLesson(entry) {
  return `<div class="lesson-expanded">
    ${entry.realContext ? `<section class="lesson-block"><h4>使用语境</h4><p>${entry.realContext}</p></section>` : ""}
    ${entry.usage ? `<section class="lesson-block"><h4>怎么使用</h4><p>${entry.usage}</p></section>` : ""}
    ${entry.whenNotToUse ? `<section class="lesson-block"><h4>不适合的情况</h4><p>${entry.whenNotToUse}</p></section>` : ""}
    ${renderPairList("关键词 / 单词", entry.vocabulary, "term", "meaning")}
    ${renderPairList("语法点 / 表达结构", entry.grammarPoints, "point", "explanation")}
    ${renderExamples(entry.examples)}
    ${entry.nuance ? `<section class="lesson-block"><h4>细微语感</h4><p>${entry.nuance}</p></section>` : ""}
    ${entry.aiNote ? `<section class="lesson-block lesson-ai-note"><h4>你可以记住</h4><p>${entry.aiNote}</p></section>` : ""}
    ${sourceMeta(entry)}
  </div>`;
}

function languageCard(entry) {
  const expanded = Boolean(state.expandedLessons[entry.id]);
  return `<article class="lesson-card language-card" data-lesson-id="${entry.id}">
    <span class="card-meta">${entry.language} / ${localizeType(entry.contentType)} / ${entry.difficulty}</span>
    <h3>核心表达</h3>
    <div class="phrase">${entry.expression}</div>
    <div class="lesson-translation"><strong>中文释义</strong><p>${entry.translation}</p></div>
    <p class="lesson-short">${entry.shortExplanation}</p>
    ${renderLearningPoint(entry)}
    <div class="lesson-chip-row" aria-label="语言知识点">${infoChips(entry.grammarPoints)}${infoChips(entry.vocabulary)}</div>
    <div class="lesson-chip-row" aria-label="主题标签">${(entry.tags || []).map(tag => `<span class="topic-chip" tabindex="0">${tag}</span>`).join("")}</div>
    <div class="actions">${actions(entry.id)}<button class="text-button lesson-toggle" type="button" data-lesson-toggle="${entry.id}" aria-expanded="${expanded}">${expanded ? "收起" : "展开学习"}</button></div>
    ${expanded ? renderExpandedLesson(entry) : ""}
  </article>`;
}

function renderLanguage() {
  const selected = state.languageTab === "korean" ? "Korean" : "English";
  const allLessons = selected === "English" ? languageLessons.english : languageLessons.korean;
  const lessons = allLessons.filter(entry => state.languageFilter === "All" || entry.contentType === state.languageFilter);
  const filterOptions = ["All", "Expression", "Grammar", "Internet", "Culture", "Exam"];
  document.querySelector("#language").innerHTML = `<span class="page-kicker">Language</span><h1 id="language-title" class="page-title">${selected === "English" ? "英语" : "韩语"}</h1><p class="page-subtitle">${selected === "English" ? "围绕自然表达、语感差异、创作和商务场景，做碎片化巩固。" : "围绕 TOPIK 中级、采访、歌词、韩网语和真实文化语境学习。"}</p><div class="toolbar"><button class="chip ${state.languageTab === "english" ? "active" : ""}" data-language="english">English</button><button class="chip ${state.languageTab === "korean" ? "active" : ""}" data-language="korean">Korean</button></div><div class="toolbar" aria-label="语言内容筛选">${filterOptions.map(filter => `<button class="chip ${state.languageFilter === filter ? "active" : ""}" data-language-filter="${filter}">${localizeType(filter)}</button>`).join("")}</div><div class="lesson-grid">${lessons.map(languageCard).join("")}</div>`;
}

function actions(id) {
  const preference = state.preferences[id] || "";
  const saved = isSaved(id);
  const options = ["感兴趣", "不感兴趣", "不符合我的取向"];
  return `<div class="actions" data-actions="${id}"><button class="save-button ${saved ? "saved" : ""}" data-save="${id}">${saved ? "已收藏" : "收藏到资料库"}</button>${options.map(label => `<button class="action-button ${preference === label ? "active" : ""}" data-preference="${id}" data-value="${label}">${label}</button>`).join("")}</div>`;
}

function setLanguage(language) {
  state.languageTab = language;
  state.languageFilter = "All";
  localStorage.setItem(storageKeys.languageTab, language);
  renderLanguage();
  bindActions();
}

const languageFixBaseBindActions = bindActions;
bindActions = function bindLanguageFixActions() {
  languageFixBaseBindActions();
  document.querySelectorAll("[data-language-filter]").forEach(button => button.addEventListener("click", () => {
    state.languageFilter = button.dataset.languageFilter;
    renderLanguage();
    bindActions();
  }));
  document.querySelectorAll("[data-lesson-toggle]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.lessonToggle;
    state.expandedLessons[id] = !state.expandedLessons[id];
    renderLanguage();
    bindActions();
  }));
};

render();
