# ATIAA Workflow

## Branching

- Do all feature and design work on `staging`.
- Do not work directly on `main` unless the change is an approved exception.
- Merge `staging` into `main` with a fast-forward merge after approval.

## Delivery Flow

1. Implement on `staging`.
2. Run quality checks:
   - `npm run lint`
   - `npm run build`
   - `npm run qa:homepage`
   - Route-level Playwright QA when the change touches interior pages
3. Push `staging`.
4. Wait for the Vercel `staging` preview to be `READY`.
5. Share the staging preview URL for review.
6. After approval, fast-forward `main` to the approved `staging` commit.
7. Confirm the Vercel `main` deployment is `READY` and report the live URL.

## Visual QA

- Primary viewport widths:
  - `390`
  - `768`
  - `1280`
  - `1536`
- Keep mobile intentional, not just compressed desktop.
- Use Playwright screenshots for homepage and any new interior pages before shipping.
- Store QA artifacts under `artifacts/` or `output/playwright/`, not new top-level folders.

## Repo Conventions

- Framework: Next.js App Router
- Styling: Tailwind CSS
- Motion: restrained Framer Motion only where it improves hierarchy
- Copy: French-first visible copy
- Assets: local imagery only, no hotlinked production images
- Design direction: production-quality, monochrome editorial system with strong hierarchy and responsive polish

## Editing Rules

- Use `apply_patch` for manual file edits.
- Prefer reusable sections/components over duplicating homepage markup across routes.
- Preserve typed content in `lib/site-content.ts` when adding or changing visible copy.
- Keep navigation, footer, and CTA behavior consistent across pages.

## Deployment

- Vercel previews are the default review surface.
- Report the exact preview URL after each staging push.
- Report the live URL only after the `main` deployment matches the intended commit.
