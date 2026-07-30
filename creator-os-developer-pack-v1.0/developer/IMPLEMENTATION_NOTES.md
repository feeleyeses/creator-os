# Implementation Notes

## Recommended MVP stack

Use a simple modern web stack that Codex can maintain easily:

- Next.js
- TypeScript
- Tailwind CSS
- local mock data first
- localStorage for lightweight preferences and Library state

Do not introduce a database, authentication or external AI API in the first pass unless already configured.

## Initial routes

- `/` → Today
- `/observe`
- `/language`
- `/library`

Reserve future routes:

- `/create`
- `/growth`

## Layout

Desktop:

- fixed left sidebar;
- central reading column;
- optional contextual side panel only when useful.

Mobile:

- single-column reading;
- compact bottom or top navigation;
- do not shrink desktop cards mechanically.

## Visual direction

Quiet Editorial Design:

- warm off-white background;
- low-saturation green accent;
- charcoal body text;
- soft gray borders;
- moderate-to-high information density with low reading pressure;
- restrained rounded corners and shadows;
- modern sans-serif typography;
- smooth but subtle motion.

Avoid:

- AI blue-purple gradients;
- heavy glassmorphism;
- oversized marketing imagery;
- cold developer-tool aesthetics;
- decorative motion that delays reading.

## Build order

1. App shell and responsive navigation.
2. Today page with realistic mock content.
3. Observe category filters and cards.
4. Language daily lesson and English/Korean tabs.
5. Library save/tag/remove interactions.
6. Simple preference tags: interested / not interested / not my taste.
7. Polish only after the full flow is usable.
