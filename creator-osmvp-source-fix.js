function sourceMeta(entry) {
  if (!entry.sourceName && !entry.sourceUrl) return "";
  const details = [entry.sourceName, entry.sourceType, entry.author, entry.publishedAt].filter(Boolean).join(" &#183; ");
  return `<div class="source-meta">${details ? `<span>${details}</span>` : ""}${entry.sourceUrl ? `<a class="source-link" href="${entry.sourceUrl}" target="_blank" rel="noopener noreferrer">Source &#8599;</a>` : ""}</div>`;
}

render();
