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
- Responsive mobile navigation and desktop sidebar
- Browser-local persistence under `focusflow-mvp`
- No analytics, external AI calls, authentication, or health-data transmission
- Deterministic coach responses from a bounded productivity playbook

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
