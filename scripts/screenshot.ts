/**
 * Screenshots of every rendered output, for the README and for eyeballing
 * the design: desktop and phone widths of the email and the page, the
 * certificate, the share card, and two email-client previews.
 *
 * Needs Playwright's Chromium: `npx playwright install chromium` once.
 */
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, type Browser } from "playwright";

/**
 * Launch Chromium: the Playwright-managed build if installed, else any
 * Chromium already in Playwright's cache (a different Playwright version's
 * build still screenshots fine), else CHROMIUM_PATH.
 */
async function launchBrowser(): Promise<Browser> {
  try {
    return await chromium.launch();
  } catch {
    const candidates: string[] = [];
    if (process.env.CHROMIUM_PATH) candidates.push(process.env.CHROMIUM_PATH);
    const cache = join(homedir(), ".cache", "ms-playwright");
    for (const entry of (await readdir(cache).catch(() => [] as string[])).sort().reverse()) {
      for (const sub of ["chrome-linux64/chrome", "chrome-linux/chrome", "chrome-mac/Chromium.app/Contents/MacOS/Chromium"]) {
        const p = join(cache, entry, sub);
        if (existsSync(p)) candidates.push(p);
      }
    }
    for (const executablePath of candidates) {
      try {
        return await chromium.launch({ executablePath });
      } catch {
        // try the next one
      }
    }
    throw new Error("No Chromium found. Run: npx playwright install chromium");
  }
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");
const shots = join(root, "docs", "screenshots");

async function shot(
  browser: Awaited<ReturnType<typeof chromium.launch>>,
  file: string,
  name: string,
  width: number,
  height = 900,
  settleMs = 0,
  fullPage = true
) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`file://${join(out, file)}`, { waitUntil: "networkidle" });
  // Email-client previews draw the email with a script after load; give the
  // model time to finish before measuring the page's height.
  if (settleMs > 0) await page.waitForTimeout(settleMs);
  await page.screenshot({ path: join(shots, name), fullPage });
  await page.close();
  console.log(`  ${name}`);
}

async function main() {
  await mkdir(shots, { recursive: true });
  const browser = await launchBrowser();
  try {
    await shot(browser, "email.html", "email.png", 680);
    await shot(browser, "email.html", "email-mobile.png", 375);
    await shot(browser, "page.html", "page.png", 1024);
    await shot(browser, "page.html", "page-mobile.png", 375);
    await shot(browser, "certificate.html", "certificate.png", 1200);
    await shot(browser, "clients/outlook.html", "email-outlook.png", 820, 900, 4000);
    await shot(browser, "clients/gmail.html", "email-gmail.png", 820, 900, 4000);
    // The SVG share card, drawn by the browser (its text is paths, so it
    // needs no fonts): proves the SVG renders, not just the PNG.
    await shot(browser, "share-card.svg", "share-card-svg.png", 1200, 627, 0, false);
    await copyFile(join(out, "share-card.png"), join(shots, "share-card.png"));
    console.log("  share-card.png (copied from out/)");
  } finally {
    await browser.close();
  }
  console.log("\n✓ Screenshots in docs/screenshots/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
