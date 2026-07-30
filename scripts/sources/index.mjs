import { collectManualSources } from "./manual-source-adapter.mjs";
import { collectRssSources } from "./rss-adapter.mjs";

export async function collectCandidates() {
  const sources = await Promise.all([collectManualSources(), collectRssSources()]);
  return sources.flat().filter(candidate => candidate && candidate.sourceUrl);
}
