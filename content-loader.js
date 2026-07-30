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
    return `<div class="brief-group"><h2>${groupName}</h2><div class="brief-list">${items.map((item, index) => `<button class="brief-item" type="button" data-brief-observe="${item.relatedObserveId}" data-brief-category="${item.category}"><span class="brief-index">${String(index + 1).padStart(2, "0")}</span><span class="brief-copy"><strong>${item.title}</strong><em>${item.summary}</em><small>${item.category} · ${item.readTime}</small></span><span class="brief-link">Read in Observe →</span></button>`).join("")}</div></div>`;
  }
  renderToday = function renderTodayFromCurrentJson() {
    const data = window.CreatorOSDailyContent?.data;
    if (!data) return;
    const focus = data.today.focus;
    const continueItems = (data.today.continueLearning || []).map(resolveItem).filter(Boolean);
    document.querySelector("#today").innerHTML = `<div class="today-editor-opening" aria-label="Editor's Opening"><span class="page-kicker">EDITOR'S OPENING</span><p id="today-title">${focus.aiNote || "今天先抓住一个重点，再进入可继续观察的线索。"}</p></div><article class="today-focus" aria-label="Today's Focus">${imageBlock(focus)}<div class="today-focus-copy"><span class="panel-label">TODAY'S FOCUS</span><h1>${focus.title}</h1><p>${focus.summary}</p></div><div class="today-focus-aside"><span>WHY IT MATTERS</span><p>${focus.why}</p>${tags(focus.tags)}${actions(focus.id)}${sourceMeta(focus)}</div></article><section class="daily-brief" aria-label="Daily Brief"><div class="today-section-heading"><span class="panel-label">DAILY BRIEF</span></div>${renderBriefGroup("FOR YOU", data.today.brief.forYou || [])}${renderBriefGroup("TRENDING", data.today.brief.trending || [])}</section><section class="today-continue" aria-label="Continue Learning"><span class="panel-label">CONTINUE LEARNING</span><div class="focus-list">${continueItems.map(entry => `<div class="focus-row"><strong>${entry.language || entry.category}</strong><span>${entry.title || entry.expression}</span></div>`).join("")}</div></section>`;
  };
  renderObserve = function renderObserveFromCurrentJson() {
    const filters = ["All", "Self-media", "Design", "K-Hiphop", "AI", "E-commerce"];
    const items = content.filter(entry => entry.page === "observe" && (state.observeFilter === "All" || entry.category === state.observeFilter));
    document.querySelector("#observe").innerHTML = `<span class="page-kicker">Observe</span><h1 id="observe-title" class="page-title">Observe, do not chase.</h1><p class="page-subtitle">把自媒体、设计、K-Hiphop、AI 和电商里的分散信号，整理成可以继续判断的上下文。</p><div class="toolbar">${filters.map(filter => `<button class="chip ${state.observeFilter === filter ? "active" : ""}" data-filter="${filter}">${filter}</button>`).join("")}</div><div class="observe-masonry">${items.map(observeCard).join("")}</div>`;
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
