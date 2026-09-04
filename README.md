# FocusFlow MVP

A mobile-first focus planner that helps people plan their day, notice when they are stuck, complete a short recovery intervention, and return to the intended task.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The current verified preview in the Codex workspace runs on port `3090`.

## Architecture

- Next.js 16 App Router and TypeScript
- Server-rendered page shell with a focused interactive client boundary
- Domain models are centralized in `src/types`
- Reviewed product content and demo data live in `src/content` and `public/content`
- Support flows, local guide, and SVG iconography are isolated in `src/features/support`
- Browser integration logic is contained in reusable hooks under `src/hooks`
- Responsive mobile navigation and desktop sidebar
- Browser-local persistence under `focusflow-mvp`
- No analytics, external AI calls, authentication, or health-data transmission
- Deterministic coach responses loaded from `public/content/support-library.yaml`

## Content workflow

Support answers are data, not component code. Add or revise entries in the YAML library,
then run `npm run format` and `npm run build`. Every entry has a category, question,
reviewed answer, next action, and an optional safety caution.

## Implemented flows

- Dashboard, daily calendar, task details
- Focus and pause timers
- Three-step “I’m stuck” recovery and reflection
- Local return-to-task insights
- Goals and habit interactions
- Productivity coach and privacy settings
- Task creation and completion

## Current MVP limitations

Calendar connections, cloud sync, authentication, native app blocking, notifications, full task editing, and a production AI provider are intentionally not connected. They should be added only after user validation and a privacy/security review.

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```
