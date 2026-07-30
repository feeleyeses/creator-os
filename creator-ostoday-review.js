Object.assign(content[0], {
  sourceName: "Shopify App Store: Shoppulse PhotoAI",
  sourceUrl: "https://apps.shopify.com/shoppulse",
  sourceType: "app listing",
  author: "ShopPulse",
  publishedAt: "2026-03-11",
  imageUrl: "",
  imageAlt: "",
  imageCredit: "",
  imageSourceUrl: "",
  imagePurpose: ""
});

Object.assign(content[1], {
  sourceName: "Wikipedia: GroovyRoom",
  sourceUrl: "https://en.wikipedia.org/wiki/GroovyRoom",
  sourceType: "artist reference",
  author: "Wikipedia contributors",
  publishedAt: "",
  imageUrl: "",
  imageAlt: "",
  imageCredit: "",
  imageSourceUrl: "",
  imagePurpose: ""
});

Object.assign(content[2], {
  sourceName: "Wikimedia Commons: Box of Korean cosmetics",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Box_of_Korean_cosmetics.jpg",
  sourceType: "image reference",
  author: "Teemeah",
  publishedAt: "2016-11-28",
  imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Box_of_Korean_cosmetics.jpg?width=960",
  imageAlt: "A box of Innisfree green tea line cosmetic products showing green packaging, product hierarchy, and grouped skincare containers.",
  imageCredit: "Teemeah, CC BY-SA 3.0, via Wikimedia Commons",
  imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Box_of_Korean_cosmetics.jpg",
  imagePurpose: "Shows real K-beauty packaging, spacing, green palette, and grouped product information so the design note is inspectable."
});

function tags(list) {
  return `<div class="tag-row">${list.map(tag => `<button class="tag" type="button" data-topic="${tag}">${tag}</button>`).join("")}</div>`;
}

function sourceMeta(item) {
  if (!item.sourceName && !item.sourceUrl) return "";
  const details = [item.sourceType, item.author, item.publishedAt].filter(Boolean).join(" &#183; ");
  return `<div class="source-meta">
    ${details ? `<span>${details}</span>` : ""}
    ${item.sourceUrl ? `<a class="source-link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">Source &#8599;</a>` : ""}
  </div>`;
}

function imageBlock(item) {
  if (!item.imageUrl || !item.imageAlt) return "";
  const credit = item.imageCredit || item.imageSourceUrl ? `<figcaption>${item.imageCredit || "Image source"}${item.imageSourceUrl ? ` &#183; <a href="${item.imageSourceUrl}" target="_blank" rel="noopener noreferrer">Image source &#8599;</a>` : ""}</figcaption>` : "";
  return `<figure class="content-image" data-purpose="${item.imagePurpose || "explain"}">
    <img src="${item.imageUrl}" alt="${item.imageAlt}" loading="lazy">
    ${credit}
  </figure>`;
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
      </div>
      <div class="today-focus-aside">
        <span>Why it matters</span>
        <p>${focus.aiNote}</p>
        ${tags(focus.tags)}
        ${actions(focus.id)}
        ${sourceMeta(focus)}
      </div>
    </article>

    <section class="today-section" aria-label="Fresh Finds">
      <div class="today-section-heading">
        <span class="panel-label">Fresh Finds</span>
      </div>
      <div class="fresh-grid">${fresh.map(item => `
        <article class="fresh-card">
          ${imageBlock(item)}
          <div class="fresh-card-body">
            <span class="card-meta">${item.sourceName}</span>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
          </div>
          <div class="fresh-card-footer">
            ${actions(item.id)}
            ${sourceMeta(item)}
          </div>
        </article>`).join("")}</div>
    </section>

    <section class="today-continue" aria-label="Continue Learning">
      <span class="panel-label">Continue Learning</span>
      <div class="focus-list">${continueItems.map(item => `
        <div class="focus-row"><strong>${item.category}</strong><span>${item.title}</span></div>`).join("")}</div>
    </section>`;
}

function activateTopic(topic) {
  const normalized = topic.toLowerCase();
  const topicMap = {
    "self-media": "Self-media",
    "design": "Design",
    "packaging": "Design",
    "k-brand": "Design",
    "k-hiphop": "K-Hiphop",
    "culture": "K-Hiphop",
    "sound identity": "K-Hiphop",
    "ai": "AI",
    "product": "AI",
    "workflow": "AI",
    "e-commerce": "E-commerce",
    "copywriting": "E-commerce",
    "trust": "E-commerce"
  };
  const filter = topicMap[normalized] || "All";
  state.observeFilter = filter;
  localStorage.setItem(storageKeys.observeFilter, filter);
  setPage("observe");
  renderObserve();
  bindActions();
}

const bindActionsBase = bindActions;
bindActions = function bindActionsWithTopics() {
  bindActionsBase();
  document.querySelectorAll("[data-topic]").forEach(button => {
    button.addEventListener("click", () => activateTopic(button.dataset.topic));
  });
};

render();
