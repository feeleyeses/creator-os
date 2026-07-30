import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { collectCandidates } from "./sources/index.mjs";

const root = process.cwd();
const currentPath = path.join(root, "content", "current.json");
const archiveDir = path.join(root, "content", "archive");
const tempPath = path.join(root, "content", ".candidate-current.json");
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);

function shanghaiDate() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}
function readJson(file) { return JSON.parse(fs.readFileSync(file, "utf8")); }
function validate(file) {
  const result = spawnSync(process.execPath, ["scripts/validate-content.mjs", file], { cwd: root, encoding: "utf8" });
  if (result.status !== 0) {
    process.stderr.write(result.stdout || "");
    process.stderr.write(result.stderr || "");
    throw new Error(`Validation failed for ${file}`);
  }
  process.stdout.write(result.stdout || "");
}
function archivePrevious(previous) {
  fs.mkdirSync(archiveDir, { recursive: true });
  const archivePath = path.join(archiveDir, `${previous.date}.json`);
  if (fs.existsSync(archivePath)) throw new Error(`Archive already exists: ${archivePath}`);
  fs.writeFileSync(archivePath, JSON.stringify(previous, null, 2) + "\n", "utf8");
  return archivePath;
}
async function generateCandidate(previous, candidates) {
  if (!hasOpenAI) return null;
  if (!candidates.length) return null;
  console.log(`OpenAI generation layer is configured for model ${model}, but publishing generated editorial content is disabled until prompt and source review are added.`);
  return null;
}

const previous = readJson(currentPath);
validate(currentPath);
const candidates = await collectCandidates();
const dryRun = !hasOpenAI || !candidates.length;
console.log(`Creator OS daily content report for ${shanghaiDate()} Asia/Shanghai`);
console.log(`Candidates with traceable sources: ${candidates.length}`);
console.log(`OPENAI_API_KEY present: ${hasOpenAI ? "yes" : "no"}`);
if (dryRun) {
  console.log("Safe dry-run: current.json was not changed.");
  console.log(`Would archive current content as content/archive/${previous.date}.json before a valid replacement.`);
  console.log("Required before live updates: configured source adapters with traceable sourceUrl values and reviewed OpenAI generation prompts.");
  process.exit(0);
}
const candidate = await generateCandidate(previous, candidates);
if (!candidate) {
  console.log("No publishable candidate was produced; current.json remains unchanged.");
  process.exit(0);
}
fs.writeFileSync(tempPath, JSON.stringify(candidate, null, 2) + "\n", "utf8");
try {
  validate(tempPath);
  const archivePath = archivePrevious(previous);
  fs.renameSync(tempPath, currentPath);
  console.log(`Archived previous content to ${path.relative(root, archivePath)}`);
  console.log("Replaced content/current.json with validated candidate content.");
} catch (error) {
  if (fs.existsSync(tempPath)) fs.rmSync(tempPath);
  console.error(`Daily update failed safely: ${error.message}`);
  console.error("current.json was not replaced.");
  process.exit(1);
}
