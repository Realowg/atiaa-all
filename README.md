# ATIAA

Premium French-first homepage for **Alliance Togolaise pour l’IA Appliquée**.

The site positions ATIAA as an African ecosystem and coalition platform rather than a generic SaaS landing page. It is built with Next.js App Router, Tailwind CSS, and restrained Framer Motion.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- Playwright for visual QA screenshots

## Local Development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
npm run qa:homepage
```

`npm run qa:homepage` saves responsive screenshots and section captures under `artifacts/homepage`.

## Deployment

The project is configured for deployment on Vercel as a static-first Next.js site.

## Structure

- `app/` app router entrypoints, metadata, global styles
- `components/homepage.tsx` homepage composition and motion
- `lib/site-content.ts` typed site content and future locale-ready structure
- `scripts/qa-homepage.mjs` Playwright screenshot workflow

## Brand Positioning

- Bright premium interface
- Deep navy anchor color with saffron accents
- Editorial pacing and asymmetric layout
- Institutional credibility over startup-template patterns
