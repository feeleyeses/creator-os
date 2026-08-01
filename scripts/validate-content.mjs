import fs from "node:fs";
import path from "node:path";

const contentPath = process.argv[2] || "content/current.json";
const root = process.cwd();
const categories = ["Self-media", "Design", "K-Hiphop", "AI", "E-commerce"];
const placeholderUrl = /(example\.com|placeholder|localhost|127\.0\.0\.1|fake|invalid)/i;
const cjk = /[\u3400-\u9fff]/;
const errors = [];

function fail(message) { errors.push(message); }
function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { fail(`${file}: ${error.message}`); return null; }
}
function validUrl(value, label) {
  if (!value) return;
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) fail(`${label} must use http or https: ${value}`);
    if (placeholderUrl.test(value)) fail(`${label} looks like a placeholder URL: ${value}`);
  } catch { fail(`${label} is not a valid URL: ${value}`); }
}

function validUpdateMeta(item, label, contentDate) {
  const statuses = new Set(["new-today", "updated-today", "carried-over"]);
  if (item.updatedAt && !Date.parse(item.updatedAt)) fail(`${label}.updatedAt must be parseable ISO time`);
  if (item.updatedDate && !/^\d{4}-\d{2}-\d{2}$/.test(item.updatedDate)) fail(`${label}.updatedDate must be YYYY-MM-DD`);
  if (item.updateStatus && !statuses.has(item.updateStatus)) fail(`${label}.updateStatus is not supported: ${item.updateStatus}`);
  if ((item.updateStatus === "new-today" || item.updateStatus === "updated-today") && item.updatedDate && item.updatedDate !== contentDate) fail(`${label}.updatedDate should match content date for today status`);
}
function text(value, label) {
  if (value === undefined || value === null) fail(`${label} is ${value}`);
  if (typeof value === "string" && /undefined|null/.test(value)) fail(`${label} contains undefined/null text`);
}
function walk(value, label) {
  if (value === undefined || value === null) return fail(`${label} is ${value}`);
  if (typeof value === "string") return text(value, label);
  if (Array.isArray(value)) return value.forEach((item, index) => walk(item, `${label}[${index}]`));
  if (typeof value === "object") return Object.entries(value).forEach(([key, item]) => walk(item, `${label}.${key}`));
}
function hasChinese(value, label) {
  if (!cjk.test(value || "")) fail(`${label} should contain Chinese knowledge content`);
}
function validateItem(item, ids, label, contentDate = "") {
  ["id", "page", "source", "category", "contentType", "title", "summary", "what", "why", "takeaway"].forEach(key => text(item[key], `${label}.${key}`));
  if (ids.has(item.id)) fail(`Duplicate id: ${item.id}`);
  ids.add(item.id);
  ["title", "summary", "what", "why", "takeaway"].forEach(key => hasChinese(item[key], `${label}.${key}`));
  if (!Array.isArray(item.tags) || !item.tags.length) fail(`${label}.tags must be a non-empty array`);
  validUrl(item.sourceUrl, `${label}.sourceUrl`);
  validUrl(item.imageUrl, `${label}.imageUrl`);
  validUrl(item.imageSourceUrl, `${label}.imageSourceUrl`);
  if (item.imageUrl) {
    if (!item.imageAlt) fail(`${label} imageUrl requires imageAlt`);
    if (!item.imageCredit) fail(`${label} imageUrl requires imageCredit`);
    if (!item.imageSourceUrl) fail(`${label} imageUrl requires imageSourceUrl`);
  }
}
function validateLesson(lesson, ids, label, expectedLanguage, contentDate = "") {
  ["id", "page", "source", "language", "contentType", "difficulty", "expression", "translation", "shortExplanation", "realContext", "usage", "whenNotToUse", "nuance", "aiNote"].forEach(key => text(lesson[key], `${label}.${key}`));
  if (ids.has(lesson.id)) fail(`Duplicate id: ${lesson.id}`);
  ids.add(lesson.id);
  if (lesson.language !== expectedLanguage) fail(`${label}.language should be ${expectedLanguage}`);
  ["translation", "shortExplanation", "realContext", "usage", "whenNotToUse", "nuance", "aiNote"].forEach(key => hasChinese(lesson[key], `${label}.${key}`));
  if (!Array.isArray(lesson.examples) || !lesson.examples.some(example => example.original && example.translation)) fail(`${label} needs at least one real example`);
  if ((!lesson.vocabulary || !lesson.vocabulary.length) && (!lesson.grammarPoints || !lesson.grammarPoints.length) && !lesson.nuance) fail(`${label} needs a learning point`);
  if (!Array.isArray(lesson.tags) || !lesson.tags.length) fail(`${label}.tags must be a non-empty array`);
  validUrl(lesson.sourceUrl, `${label}.sourceUrl`);
}
function validateArchiveDates() {
  const archiveDir = path.join(root, "content", "archive");
  if (!fs.existsSync(archiveDir)) return;
  const seen = new Set();
  for (const file of fs.readdirSync(archiveDir).filter(file => file.endsWith(".json"))) {
    const date = file.replace(/\.json$/, "");
    if (seen.has(date)) fail(`Duplicate archive date filename: ${file}`);
    seen.add(date);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`Archive filename must be YYYY-MM-DD.json: ${file}`);
  }
}

const data = readJson(contentPath);
if (data) {
  walk(data, "content");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date || "")) fail("date must be YYYY-MM-DD");
  if (data.timezone !== "Asia/Shanghai") fail("timezone must be Asia/Shanghai");
  if (!Date.parse(data.generatedAt)) fail("generatedAt must be parseable ISO time");
  if (data.dailyVersion && typeof data.dailyVersion !== "string") fail("dailyVersion must be a string");
  if (data.dailySummary) {
    ["updatedToday", "focus", "observe", "language"].forEach(key => {
      if (data.dailySummary[key] !== undefined && (!Number.isInteger(data.dailySummary[key]) || data.dailySummary[key] < 0)) fail(`dailySummary.${key} must be a non-negative integer`);
    });
  }
  const ids = new Set();
  validateItem(data.today?.focus || {}, ids, "today.focus", data.date);
  const forYou = data.today?.brief?.forYou || [];
  const trending = data.today?.brief?.trending || [];
  if (forYou.length !== 3) fail("today.brief.forYou must contain exactly 3 items");
  if (trending.length !== 2) fail("today.brief.trending must contain exactly 2 items");
  const observeIds = new Set((data.observe || []).map(item => item.id));
  [...forYou, ...trending].forEach((brief, index) => {
    ["id", "relatedObserveId", "category", "readTime", "title", "summary"].forEach(key => text(brief[key], `brief[${index}].${key}`));
    hasChinese(brief.title, `brief[${index}].title`);
    hasChinese(brief.summary, `brief[${index}].summary`);
    if (!observeIds.has(brief.relatedObserveId)) fail(`brief ${brief.id} references missing observe item ${brief.relatedObserveId}`);
  });
  if ((data.observe || []).length < 25) fail("observe needs at least 25 items");
  categories.forEach(category => {
    const count = (data.observe || []).filter(item => item.category === category).length;
    if (count < 5) fail(`observe category ${category} needs at least 5 items; found ${count}`);
  });
  (data.observe || []).forEach((item, index) => validateItem(item, ids, `observe[${index}]`, data.date));
  const english = data.language?.english || [];
  const korean = data.language?.korean || [];
  if (english.length < 8) fail(`English needs at least 8 lessons; found ${english.length}`);
  if (korean.length < 8) fail(`Korean needs at least 8 lessons; found ${korean.length}`);
  english.forEach((lesson, index) => validateLesson(lesson, ids, `language.english[${index}]`, "English", data.date));
  korean.forEach((lesson, index) => validateLesson(lesson, ids, `language.korean[${index}]`, "Korean", data.date));
}
validateArchiveDates();
if (errors.length) {
  console.error("Content validation failed:");
  errors.slice(0, 80).forEach(error => console.error(`- ${error}`));
  if (errors.length > 80) console.error(`- ...and ${errors.length - 80} more`);
  process.exit(1);
}
console.log(`Content validation passed for ${contentPath}`);
