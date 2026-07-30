# Daily Content Pipeline

Creator OS daily content is stored in `content/current.json` and preserved in `content/archive/` before replacement.

## Schedule

Workflow: `.github/workflows/daily-content.yml`

GitHub Actions cron runs in UTC, so the schedule is:

`0 0 * * *`

This equals 08:00 Asia/Shanghai.

The workflow also supports `workflow_dispatch` for manual testing.

## Required Secrets

Optional:

- `OPENAI_API_KEY`

Optional variable:

- `OPENAI_MODEL`, defaulting to `gpt-4.1-mini`

The browser never calls OpenAI directly. API keys must only be available to server-side scripts inside GitHub Actions or another trusted runtime.

## Dry-Run Behavior

If `OPENAI_API_KEY` is missing, or no source adapter returns traceable source material, `scripts/update-daily-content.mjs` enters safe dry-run mode:

- `content/current.json` is not changed.
- no archive file is written.
- the script reports what would happen and what configuration is still required.

This prevents unsupported claims or invented live content from being published.

## Source Adapters

Source adapter interface lives in `scripts/sources/`.

Initial adapters:

- `manual-source-adapter.mjs`
- `rss-adapter.mjs`

Adapters must return candidates with traceable source metadata, especially `sourceName`, `sourceUrl`, `sourceType`, `author` when available, and `publishedAt` when available. Sources without a reliable URL are rejected before generation.

## Validation

Run:

`node scripts/validate-content.mjs content/current.json`

Validation checks:

- required IDs
- unique IDs
- date and timezone
- Today brief references to Observe items
- Observe minimum counts by category
- Language minimum lesson counts
- Chinese knowledge-content fields
- original English/Korean lesson expressions
- valid source and image URLs
- image alt, credit and source when images exist
- no `undefined` or `null` rendered text
- no placeholder URLs
- archive filename sanity

If validation fails, the workflow exits before committing content changes.

## Archive Behavior

Before a valid new `current.json` replaces the previous one, the previous file is written to:

`content/archive/YYYY-MM-DD.json`

The date comes from the previous content file. Existing archive files are never silently overwritten.

Historical content is preserved for future archive UX decisions, but no Archive navigation is exposed in this version.
