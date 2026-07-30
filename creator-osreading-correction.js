const observeImageSet = {
  "obs-design-packaging": { imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Box_of_Korean_cosmetics.jpg?width=960", imageAlt: "Innisfree green tea skincare products arranged in a green Korean cosmetics box.", imageCredit: "Teemeah, CC BY-SA 3.0, via Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Box_of_Korean_cosmetics.jpg", visualImportance: 2 },
  "obs-design-typography": { imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/3%20Korean%20Samples.png?width=960", imageAlt: "Three samples of Korean typography showing different Hangul letterform treatments.", imageCredit: "Wikimedia Commons contributors, via Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:3_Korean_Samples.png", visualImportance: 2 },
  "obs-design-ui": { imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wireframe_Example.jpg?width=960", imageAlt: "A basic webpage wireframe showing URL, title, links, graphics, and layout blocks.", imageCredit: "BadSprad, CC BY-SA 4.0, via Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Wireframe_Example.jpg", visualImportance: 1 },
  "obs-self-instagram-carousel": { imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Instagram_app_on_smartphone.jpg?width=960", imageAlt: "Instagram app displayed on a smartphone, useful for understanding feed-based visual reading behavior.", imageCredit: "Santeri Viinamäki, CC BY-SA 4.0, via Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Instagram_app_on_smartphone.jpg", visualImportance: 1 },
  "obs-khh-visual": { imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/32nd_Golden_Disc_Awards.jpg?width=960", imageAlt: "A Korean-language awards poster with compact typography and stage-event visual hierarchy.", imageCredit: "Wikimedia Commons contributors, via Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:32nd_Golden_Disc_Awards.jpg", visualImportance: 1 },
  "obs-ai-product": { imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/20230625_09_11_50-Greenshot_crop.png?width=960", imageAlt: "A GPT4All interface screenshot showing model selection and local AI chat workflow UI.", imageCredit: "Wikimedia Commons contributors, via Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:20230625_09_11_50-Greenshot_crop.png", visualImportance: 1 },
  "obs-ecom-product-page": { imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Things_Remembered.jpg?width=960", imageAlt: "A wide website screenshot from Things Remembered, useful as an e-commerce page layout reference.", imageCredit: "Wikimedia Commons contributors, via Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Things_Remembered.jpg", visualImportance: 1 },
  "obs-ecom-trust": { imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cashback-definition-illustration.png?width=960", imageAlt: "An illustration explaining cashback, used as a trust and incentive detail in e-commerce.", imageCredit: "Wikimedia Commons contributors, via Wikimedia Commons", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Cashback-definition-illustration.png", visualImportance: 1 }
};
Object.entries(observeImageSet).forEach(([id, image]) => Object.assign(findCurrentContent(id) || {}, image));

function imageBlock(entry) {
  if (!entry || !entry.imageUrl || !entry.imageAlt || !entry.visualImportance) return "";
  const credit = entry.imageCredit || entry.imageSourceUrl ? `<figcaption>${entry.imageCredit || "Image source"}${entry.imageSourceUrl ? ` &#183; <a href="${entry.imageSourceUrl}" target="_blank" rel="noopener noreferrer">Image source &#8599;</a>` : ""}</figcaption>` : "";
  return `<figure class="content-image visual-${entry.visualImportance}"><img src="${entry.imageUrl}" alt="${entry.imageAlt}" loading="lazy">${credit}</figure>`;
}
function renderLearningPoint(entry) {
  const point = (entry.grammarPoints && entry.grammarPoints[0]) || (entry.vocabulary && entry.vocabulary[0]) || (entry.nuance ? { point: "Nuance", explanation: entry.nuance } : null);
  if (!point) return "";
  const label = point.point || point.term;
  const text = point.explanation || point.meaning || entry.nuance;
  return `<div class="lesson-main-point"><span>${label}</span><p>${text}</p></div>`;
}
function languageCard(entry) {
  const expanded = Boolean(state.expandedLessons[entry.id]);
  return `<article class="lesson-card language-card" data-lesson-id="${entry.id}" data-language-kind="${entry.language}"><span class="card-meta">${entry.difficulty} / ${labelType(entry.contentType)}</span><div class="target-expression">${entry.expression}</div><div class="lesson-translation"><strong>Meaning</strong><p>${entry.translation}</p></div><p class="lesson-short">${entry.shortExplanation}</p>${renderLearningPoint(entry)}${actions(entry.id)}<div class="learning-control"><button class="lesson-toggle" type="button" data-lesson-toggle="${entry.id}" aria-expanded="${expanded}">${expanded ? "Collapse ↑" : "Continue learning ↓"}</button></div>${expanded ? renderExpandedLesson(entry) : ""}</article>`;
}
function observeCard(entry) {
  return `<article class="item-card observe-card observe-${entry.contentType || "observation"}" id="observe-${entry.id}" data-observe-id="${entry.id}"><span class="from-today-label">FROM TODAY</span>${imageBlock(entry)}<span class="card-meta">${entry.category} / ${entry.subCategory} / ${entry.contentType || "observation"} / ${entry.readingTime || "1 min"}</span><h3>${entry.title}</h3><p>${entry.summary}</p><div class="what-why observe-reading"><section><strong>What happened</strong><p>${entry.what}</p></section><section><strong>Why it matters</strong><p>${entry.why}</p></section><section><strong>Remember this</strong><p>${entry.takeaway}</p></section></div>${extraBlocks(entry)}${tags(entry.tags)}${sourceMeta(entry)}${actions(entry.id)}</article>`;
}
function openBriefItem(id, category) {
  state.observeFilter = category || "All";
  localStorage.setItem(storageKeys.observeFilter, state.observeFilter);
  setPage("observe");
  renderObserve();
  bindActions();
  requestAnimationFrame(() => {
    const target = document.querySelector(`[data-observe-id="${id}"]`);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - Math.max(96, window.innerHeight * 0.18);
      window.scrollTo({ top, behavior: "smooth" });
      target.classList.add("observe-highlight", "from-today-active");
      setTimeout(() => target.classList.remove("observe-highlight", "from-today-active"), 1800);
    }
  });
}
render();
bindActions();
