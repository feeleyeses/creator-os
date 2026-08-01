(function () {
  const contentUrl = new URL("content/current.json", document.baseURI);
  window.CreatorOSDailyContent = { loaded: false, date: "" };

  function toContentArray(data) {
    return [data.today.focus, ...(data.observe || [])].filter(Boolean);
  }
  function replaceArray(target, next) {
    target.splice(0, target.length, ...next);
  }
  function hydrateContent(data) {
    replaceArray(content, toContentArray(data));
    languageLessons.english = data.language?.english || [];
    languageLessons.korean = data.language?.korean || [];
    window.CreatorOSDailyContent = { loaded: true, date: data.date, data };
    if (typeof migrateLibraryStorage === "function") migrateLibraryStorage();
  }
  function resolveItem(id) {
    return content.find(item => item.id === id) || Object.values(languageLessons).flat().find(item => item.id === id);
  }
  function formatDate(value) {
    return value || window.CreatorOSDailyContent?.date || "";
  }
  function statusLabel(status) {
    return status === "new-today" ? "NEW TODAY" : status === "updated-today" ? "UPDATED TODAY" : "";
  }
  function updateMeta(entry, options = {}) {
    const date = formatDate(entry?.updatedDate);
    const label = statusLabel(entry?.updateStatus);
    if (!date && !label) return "";
    if (options.languageOnly) return date ? `<div class="update-meta update-meta-quiet"><span>Updated ${date}</span></div>` : "";
    const badge = label ? `<span class="update-pill">${label}</span>` : "";
    const prefix = options.todayFocus ? "" : "Updated";
    return `<div class="update-meta ${options.todayFocus ? "update-meta-focus" : "update-meta-quiet"}">${badge}${date ? `<span>${prefix ? `${prefix} ` : ""}${date}</span>` : ""}</div>`;
  }
  function dailySummary(data) {
    const summary = data.dailySummary || {};
    const fallbackItems = [data.today?.focus, ...(data.today?.brief?.forYou || []), ...(data.today?.brief?.trending || []), ...(data.observe || []), ...(data.language?.english || []), ...(data.language?.korean || [])];
    const updatedToday = summary.updatedToday ?? fallbackItems.filter(item => ["new-today", "updated-today"].includes(item?.updateStatus)).length;
    const focus = summary.focus ?? (["new-today", "updated-today"].includes(data.today?.focus?.updateStatus) ? 1 : 0);
    const observe = summary.observe ?? (data.observe || []).filter(item => ["new-today", "updated-today"].includes(item?.updateStatus)).length;
    const language = summary.language ?? [...(data.language?.english || []), ...(data.language?.korean || [])].filter(item => ["new-today", "updated-today"].includes(item?.updateStatus)).length;
    return `<div class="daily-update-summary" aria-label="Daily update summary"><span>Updated today <strong>${updatedToday}</strong></span><span>Focus <strong>${focus}</strong></span><span>Observe <strong>${observe}</strong></span><span>Language <strong>${language}</strong></span></div>`;
  }

  const previousGetContent = getContent;
  getContent = function getContentFromCurrentJson(id) {
    return resolveItem(id) || previousGetContent(id);
  };
  findCurrentContent = function findCurrentContentFromCurrentJson(id) {
    return resolveItem(id);
  };
  allContentItems = function allContentItemsFromCurrentJson() {
    return [...content, ...Object.values(languageLessons).flat()];
  };

  const previousSavedSnapshot = savedSnapshot;
  savedSnapshot = function savedSnapshotForDailyContent(item) {
    const current = item || {};
    const snapshot = previousSavedSnapshot(current) || {};
    return {
      ...snapshot,
      id: current.id || snapshot.id || "",
      origin: current.source || current.page || snapshot.origin || snapshot.page || "",
      source: current.source || snapshot.source || current.page || "",
      originalDate: window.CreatorOSDailyContent?.date || snapshot.originalDate || "",
      page: current.page || snapshot.page || "",
      category: current.category || snapshot.category || "",
      language: current.language || snapshot.language || "",
      contentType: current.contentType || snapshot.contentType || "",
      title: current.title || snapshot.title || "",
      expression: current.expression || snapshot.expression || "",
      translation: current.translation || snapshot.translation || "",
      summary: current.summary || current.shortExplanation || snapshot.summary || "",
      what: current.what || snapshot.what || "",
      why: current.why || snapshot.why || "",
      takeaway: current.takeaway || snapshot.takeaway || current.aiNote || "",
      tags: current.tags || snapshot.tags || [],
      sourceName: current.sourceName || snapshot.sourceName || "",
      sourceUrl: current.sourceUrl || snapshot.sourceUrl || "",
      sourceType: current.sourceType || snapshot.sourceType || "",
      author: current.author || snapshot.author || "",
      publishedAt: current.publishedAt || snapshot.publishedAt || "",
      imageUrl: current.imageUrl || snapshot.imageUrl || "",
      imageAlt: current.imageAlt || snapshot.imageAlt || "",
      updatedAt: current.updatedAt || snapshot.updatedAt || "",
      updatedDate: current.updatedDate || snapshot.updatedDate || "",
      updateStatus: current.updateStatus || snapshot.updateStatus || "",
      savedAt: snapshot.savedAt || new Date().toISOString(),
      note: snapshot.note || "",
      preference: snapshot.preference || state.preferences[current.id] || "",
      schemaVersion: 2
    };
  };
  normalizeSavedRecord = function normalizeSavedRecordDaily(record) {
    if (!record || !record.id) return null;
    const current = resolveItem(record.id);
    const merged = { ...(current || {}), ...record };
    if (!merged.id || !(merged.title || merged.expression || merged.summary)) return null;
    return savedSnapshot(merged);
  };

  function renderBriefGroup(groupName, items) {
    return `<div class="brief-group"><h2>${groupName}</h2><div class="brief-list">${items.map((item, index) => `<button class="brief-item" type="button" data-brief-observe="${item.relatedObserveId}" data-brief-category="${item.category}"><span class="brief-index">${String(index + 1).padStart(2, "0")}</span><span class="brief-copy"><strong>${item.title}</strong><em>${item.summary}</em><small>${item.category} · ${item.readTime}${item.updatedDate ? ` · ${item.updatedDate}` : ""}</small></span><span class="brief-link">Read in Observe →</span></button>`).join("")}</div></div>`;
  }
  renderToday = function renderTodayFromCurrentJson() {
    const data = window.CreatorOSDailyContent?.data;
    if (!data) return;
    const focus = data.today.focus;
    const continueItems = (data.today.continueLearning || []).map(resolveItem).filter(Boolean);
    document.querySelector("#today").innerHTML = `<div class="today-editor-opening" aria-label="Editor's Opening"><span class="page-kicker">EDITOR'S OPENING</span><p id="today-title">${focus.aiNote || "今天先抓住一个重点，再进入可继续观察的线索。"}</p></div>${dailySummary(data)}<article class="today-focus" aria-label="Today's Focus">${imageBlock(focus)}<div class="today-focus-copy">${updateMeta(focus, { todayFocus: true })}<span class="panel-label">TODAY'S FOCUS</span><h1>${focus.title}</h1><p>${focus.summary}</p></div><div class="today-focus-aside"><span>WHY IT MATTERS</span><p>${focus.why}</p>${tags(focus.tags)}${actions(focus.id)}${sourceMeta(focus)}</div></article><section class="daily-brief" aria-label="Daily Brief"><div class="today-section-heading"><span class="panel-label">DAILY BRIEF</span></div>${renderBriefGroup("FOR YOU", data.today.brief.forYou || [])}${renderBriefGroup("TRENDING", data.today.brief.trending || [])}</section><section class="today-continue" aria-label="Continue Learning"><span class="panel-label">CONTINUE LEARNING</span><div class="focus-list">${continueItems.map(entry => `<div class="focus-row"><strong>${entry.language || entry.category}</strong><span>${entry.title || entry.expression}</span></div>`).join("")}</div></section>`;
  };
  renderObserve = function renderObserveFromCurrentJson() {
    const filters = ["All", "Self-media", "Design", "K-Hiphop", "AI", "E-commerce"];
    const items = content.filter(entry => entry.page === "observe" && (state.observeFilter === "All" || entry.category === state.observeFilter));
    document.querySelector("#observe").innerHTML = `<span class="page-kicker">Observe</span><h1 id="observe-title" class="page-title">Observe, do not chase.</h1><p class="page-subtitle">把自媒体、设计、K-Hiphop、AI 和电商里的分散信号，整理成可以继续判断的上下文。</p><div class="toolbar">${filters.map(filter => `<button class="chip ${state.observeFilter === filter ? "active" : ""}" data-filter="${filter}">${filter}</button>`).join("")}</div><div class="observe-masonry">${items.map(observeCard).join("")}</div>`;
  };
  languageCard = function languageCardFromDailyContent(entry) {
    const expanded = Boolean(state.expandedLessons[entry.id]);
    return `<article class="lesson-card language-card" data-lesson-id="${entry.id}" data-language-kind="${entry.language}">${updateMeta(entry, { languageOnly: true })}<span class="card-meta">${entry.difficulty} / ${labelType(entry.contentType)}</span><div class="target-expression">${entry.expression}</div><div class="lesson-translation"><strong>Meaning</strong><p>${entry.translation}</p></div><p class="lesson-short">${entry.shortExplanation}</p>${renderLearningPoint(entry)}${actions(entry.id)}<div class="learning-control"><button class="lesson-toggle" type="button" data-lesson-toggle="${entry.id}" aria-expanded="${expanded}">${expanded ? "Collapse ↑" : "Continue learning ↓"}</button></div>${expanded ? renderExpandedLesson(entry) : ""}</article>`;
  };
  observeCard = function observeCardFromDailyContent(entry) {
    return `<article class="item-card observe-card observe-${entry.contentType || "observation"}" id="observe-${entry.id}" data-observe-id="${entry.id}"><span class="from-today-label">FROM TODAY</span>${imageBlock(entry)}${updateMeta(entry)}<span class="card-meta">${entry.category} / ${entry.subCategory} / ${entry.contentType || "observation"} / ${entry.readingTime || "1 min"}</span><h3>${entry.title}</h3><p>${entry.summary}</p><div class="what-why observe-reading"><section><strong>What happened</strong><p>${entry.what}</p></section><section><strong>Why it matters</strong><p>${entry.why}</p></section><section><strong>Remember this</strong><p>${entry.takeaway}</p></section></div>${extraBlocks(entry)}${tags(entry.tags)}${sourceMeta(entry)}${actions(entry.id)}</article>`;
  };
  libraryCard = function libraryCardFromDailyContent(entry) {
    const note = state.notes[entry.id] || entry.note || "";
    const savedDate = entry.savedAt ? entry.savedAt.slice(0, 10) : "";
    const savedMeta = `<div class="library-date-meta">${savedDate ? `<span>Saved ${savedDate}</span>` : ""}${entry.updatedDate ? `<span>Updated ${entry.updatedDate}</span>` : ""}</div>`;
    return `<article class="library-card" data-library-id="${entry.id}">${imageBlock(entry)}${savedMeta}<span class="card-meta">${entry.source || "library"} / ${entry.category || entry.language || "Knowledge"}${entry.contentType ? " / " + labelType(entry.contentType) : ""}</span><h3>${entry.title || entry.expression}</h3>${entry.translation ? `<p>${entry.translation}</p>` : ""}${entry.summary ? `<p>${entry.summary}</p>` : ""}${tags(entry.tags || [])}${sourceMeta(entry)}<textarea class="note-input" data-note-id="${entry.id}" placeholder="Add a short note or connection...">${note}</textarea><div class="actions"><button class="text-button" data-save-note="${entry.id}">Save note</button><button class="remove-button" data-remove="${entry.id}">Remove</button></div></article>`;
  };
  openBriefItem = function openBriefItemFromCurrentJson(id, category) {
    state.observeFilter = category || "All";
    localStorage.setItem(storageKeys.observeFilter, state.observeFilter);
    setPage("observe");
    renderObserve();
    bindActions();
    requestAnimationFrame(() => {
      const target = document.querySelector(`[data-observe-id="${id}"]`);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - Math.max(96, window.innerHeight * 0.18);
      window.scrollTo({ top, behavior: "smooth" });
      target.classList.add("observe-highlight", "from-today-active");
      setTimeout(() => target.classList.remove("observe-highlight", "from-today-active"), 1800);
    });
  };

  fetch(contentUrl)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      hydrateContent(data);
      render();
      bindActions();
    })
    .catch(error => {
      console.warn(`Creator OS: content/current.json could not be loaded; using bundled fallback content. ${error.message}`);
    });
})();