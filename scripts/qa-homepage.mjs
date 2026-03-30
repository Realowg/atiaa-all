import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const targetUrl = process.env.QA_URL || "http://127.0.0.1:3000";
const outputDir = path.resolve("artifacts/homepage");
const sectionsDir = path.join(outputDir, "sections");

const viewports = [
  { name: "mobile-390", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "tablet-768", width: 768, height: 1024, isMobile: false, hasTouch: false },
  { name: "desktop-1280", width: 1280, height: 900, isMobile: false, hasTouch: false },
  { name: "desktop-1536", width: 1536, height: 960, isMobile: false, hasTouch: false },
];

await mkdir(outputDir, { recursive: true });
await mkdir(sectionsDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const report = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile,
    hasTouch: viewport.hasTouch,
    colorScheme: "light",
    locale: "fr-FR",
  });

  const page = await context.newPage();
  await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1400);

  const metrics = await page.evaluate(() => {
    const hero = document.querySelector("#accueil");
    const mission = document.querySelector("#mission");
    const contact = document.querySelector("#contact");
    const heroRect = hero?.getBoundingClientRect();
    const missionRect = mission?.getBoundingClientRect();
    const contactRect = contact?.getBoundingClientRect();

    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight,
      heroHeight: Math.round(heroRect?.height || 0),
      missionTop: Math.round(missionRect?.top || 0),
      contactTop: Math.round(contactRect?.top || 0),
    };
  });

  await page.screenshot({
    path: path.join(outputDir, `${viewport.name}-viewport.png`),
    scale: "css",
    type: "png",
  });

  await page.screenshot({
    path: path.join(outputDir, `${viewport.name}-full.png`),
    fullPage: true,
    scale: "css",
    type: "png",
  });

  report.push({ viewport: viewport.name, ...metrics });
  await context.close();
}

const reviewContext = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  colorScheme: "light",
  locale: "fr-FR",
});
const reviewPage = await reviewContext.newPage();
await reviewPage.goto(targetUrl, { waitUntil: "domcontentloaded" });
await reviewPage.waitForTimeout(1400);

const sectionSelectors = [
  "#mission",
  "#programmes",
  "#projets",
  "#adhesion",
  "#partenaires",
  "#gouvernance",
  "#roadmap",
  "#contact",
];

for (const selector of sectionSelectors) {
  const locator = reviewPage.locator(selector);
  await locator.scrollIntoViewIfNeeded();
  await reviewPage.waitForTimeout(450);
  await locator.screenshot({
    path: path.join(sectionsDir, `${selector.replace("#", "")}.png`),
    scale: "css",
    type: "png",
  });
}

await reviewContext.close();
await browser.close();
await writeFile(path.join(outputDir, "report.json"), JSON.stringify(report, null, 2));

console.log(`Saved homepage screenshots and report to ${outputDir}`);
