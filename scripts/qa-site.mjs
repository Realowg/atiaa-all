import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const targetUrl = process.env.QA_URL || "http://127.0.0.1:3000";
const outputDir = path.resolve("artifacts/site-routes");

const routes = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "programmes", path: "/programmes" },
  { name: "projets", path: "/projets" },
  { name: "adhesion", path: "/adhesion" },
  { name: "partenaires", path: "/partenaires" },
  { name: "contact", path: "/contact" },
];

const contactIntentRoutes = [
  { name: "contact-member", path: "/contact?intent=member", intent: "member" },
  { name: "contact-partner", path: "/contact?intent=partner", intent: "partner" },
  { name: "contact-project", path: "/contact?intent=project", intent: "project" },
];

const viewports = [
  { name: "mobile-390", width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: "desktop-1280", width: 1280, height: 900, isMobile: false, hasTouch: false },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const report = [];

for (const route of routes) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      hasTouch: viewport.hasTouch,
      colorScheme: "light",
      locale: "fr-FR",
    });

    const page = await context.newPage();
    await page.goto(`${targetUrl}${route.path}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1400);

    await page.screenshot({
      path: path.join(outputDir, `${route.name}-${viewport.name}.png`),
      scale: "css",
      type: "png",
    });

    if (viewport.isMobile) {
      const menuButton = page.locator('button[aria-label="Ouvrir le menu"]').first();

      if (await menuButton.count()) {
        await menuButton.click();
        await page.waitForTimeout(250);
        await page.screenshot({
          path: path.join(outputDir, `${route.name}-${viewport.name}-menu.png`),
          scale: "css",
          type: "png",
        });
      }
    }

    const metrics = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      path: window.location.pathname,
    }));

    report.push({ route: route.name, viewport: viewport.name, ...metrics });
    await context.close();
  }
}

for (const route of contactIntentRoutes) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      hasTouch: viewport.hasTouch,
      colorScheme: "light",
      locale: "fr-FR",
    });

    const page = await context.newPage();
    await page.goto(`${targetUrl}${route.path}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1400);

    const activeIntent = await page.locator('[data-active="true"]').first().getAttribute("data-intent");
    const formIntent = await page.locator("form[data-contact-intent]").getAttribute("data-contact-intent");

    await page.screenshot({
      path: path.join(outputDir, `${route.name}-${viewport.name}.png`),
      scale: "css",
      type: "png",
    });

    report.push({
      route: route.name,
      viewport: viewport.name,
      path: route.path,
      activeIntent,
      formIntent,
    });

    await context.close();
  }
}

const contactContext = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  colorScheme: "light",
  locale: "fr-FR",
});

const contactPage = await contactContext.newPage();
await contactPage.goto(`${targetUrl}/contact`, { waitUntil: "domcontentloaded" });
await contactPage.waitForTimeout(1400);

await contactPage.locator('form[data-contact-intent] button[type="button"]').click();
await contactPage.waitForTimeout(250);
await contactPage.screenshot({
  path: path.join(outputDir, "contact-invalid.png"),
  scale: "css",
  type: "png",
});

await contactPage.locator('input[name="name"]').fill("Awa Mensah");
await contactPage.locator('input[name="organization"]').fill("ATIAA");
await contactPage.locator('input[name="email"]').fill("awa@atiaa.org");
await contactPage.locator('select[name="profile"]').selectOption("expert");
await contactPage.locator('textarea[name="message"]').fill("Je souhaite contribuer aux programmes pratiques.");
await contactPage.locator('form[data-contact-intent] button[type="button"]').click();
await contactPage.waitForTimeout(250);
await contactPage.screenshot({
  path: path.join(outputDir, "contact-success.png"),
  scale: "css",
  type: "png",
});

await contactContext.close();
await browser.close();
await writeFile(path.join(outputDir, "report.json"), JSON.stringify(report, null, 2));

console.log(`Saved site route screenshots and report to ${outputDir}`);
