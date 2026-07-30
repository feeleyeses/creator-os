# Storage And Sync

Daily content is shared across devices. Library data currently remains in each browser.

## Current Storage

Creator OS uses `localStorage` for the user Library, notes and preferences. This means:

- desktop and mobile load the same daily content from `content/current.json`
- saved Library items are local to the browser
- there is no login, cloud sync or database in this sprint

## Library Snapshots

Saved Library records preserve a full snapshot so they remain readable after current daily content changes.

Saved records include, where available:

- `id`
- `origin`
- `originalDate`
- `category`
- `language`
- `contentType`
- `title`
- `expression`
- `translation`
- `summary`
- `what`
- `why`
- `takeaway`
- `tags`
- `sourceName`
- `sourceUrl`
- `sourceType`
- `author`
- `publishedAt`
- `imageUrl`
- `imageAlt`
- `savedAt`
- `note`
- `preference`
- `schemaVersion`

Library rendering should prefer current content when the ID still resolves, then fall back to the saved snapshot.

## Storage Interface

`storage/local-library.js` exposes `window.CreatorOSLocalLibrary` with:

- `getAll`
- `save`
- `remove`
- `updateNote`
- `updatePreference`
- `clearInvalid`

This keeps the local adapter boundary explicit for a future cloud-storage adapter.

## Future Options

Possible future storage and history work:

- account-based sync
- encrypted cloud Library
- archive page
- date browsing
- search
- weekly digest
- automatic expiration rules
