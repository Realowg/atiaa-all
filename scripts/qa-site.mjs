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
      const menuButton = page.getByRole("button", { name: "Ouvrir le menu" });
      await menuButton.click();
      await page.waitForTimeout(250);
      await page.screenshot({
        path: path.join(outputDir, `${route.name}-${viewport.name}-menu.png`),
        scale: "css",
        type: "png",
      });
    }

    const metrics = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      path: window.location.pathname,
    }));

    report.push({ route: route.name, viewport: viewport.name, ...metrics });
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

await contactPage.getByRole("button", { name: "Envoyer le message" }).click();
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
await contactPage.getByRole("button", { name: "Envoyer le message" }).click();
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
