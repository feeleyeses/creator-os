export async function collectManualSources() {
  return [];
}

export const manualSourceAdapter = {
  name: "manual-source-adapter",
  description: "Accepts manually curated candidate sources in future iterations. This initial adapter returns no live material so the pipeline stays safe."
};
