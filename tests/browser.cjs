// Uses Playwright when available; no production dependency is required.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:8765';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 1000 },
      colorScheme: 'light',
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    assert.equal(
      await page.locator('.skip-link').evaluate((element) => element === document.activeElement),
      true,
    );
    await page.keyboard.press('Enter');
    assert.equal(
      await page.locator('#main').evaluate((element) => element === document.activeElement),
      true,
    );
    await page.locator('[data-mode="shift"]').click();
    await page.keyboard.press('Tab');
    assert.equal(
      await page.locator('#revenue').evaluate((element) => element === document.activeElement),
      true,
    );
    async function fill(values) {
      for (const [id, value] of Object.entries(values)) await page.locator(`#${id}`).fill(value);
    }
    const submit = () => page.getByRole('button', { name: 'Calcular', exact: false }).click();
    await submit();
    assert.equal(await page.locator('#revenue').getAttribute('aria-invalid'), 'true');
    await fill({
      revenue: '200',
      distance: '120',
      consumption: '12',
      fuelPrice: '6,00',
      hours: '8',
    });
    await page.locator('#expenses summary').click();
    await fill({ food: '25' });
    await submit();
    assert.match(await page.locator('#result-value').innerText(), /115,00/);
    assert.match(await page.locator('#result-details').innerText(), /14,38/);
    await fill({ consumption: '0' });
    await submit();
    assert.equal(await page.locator('#result').isVisible(), false);
    assert.equal(await page.locator('#consumption').getAttribute('aria-invalid'), 'true');
    await fill({ consumption: '12', distance: '0' });
    await submit();
    assert.doesNotMatch(await page.locator('#result-details').innerText(), /por km/);
    await page.locator('[data-mode="ride"]').click();
    await fill({ revenue: '5', distance: '20', consumption: '10', fuelPrice: '6', minutes: '45' });
    await submit();
    assert.match(await page.locator('#result-value').innerText(), /7,00/);
    assert.equal(await page.locator('#negative-note').isVisible(), true);
    await fill({ minutes: '60' });
    await submit();
    assert.equal(await page.locator('#minutes').getAttribute('aria-invalid'), 'true');
    await page.locator('[data-mode="trip"]').click();
    assert.equal(await page.locator('#revenue').count(), 0);
    assert.equal(await page.locator('#duration').isVisible(), false);
    await fill({ distance: '120', consumption: '12', fuelPrice: '6' });
    await page.locator('#expenses summary').click();
    await fill({ tolls: '10', parking: '15' });
    await submit();
    assert.match(await page.locator('#result-value').innerText(), /85,00/);
    await page.locator('#theme').click();
    await page.locator('#theme').click();
    assert.equal(await page.locator('html').getAttribute('data-bs-theme'), 'dark');
    await page.getByRole('button', { name: 'Limpar', exact: true }).click();
    assert.equal(await page.locator('#distance').inputValue(), '');
    assert.equal(await page.locator('#result').isVisible(), false);
    assert.equal(await page.locator('html').getAttribute('data-bs-theme'), 'dark');
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('#theme').getAttribute('data-preference'), 'dark');
    await page.locator('#theme').focus();
    await page.keyboard.press('Enter');
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForFunction(() => document.documentElement.dataset.bsTheme === 'dark');
    assert.equal(await page.locator('html').getAttribute('data-bs-theme'), 'dark');
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForFunction(() => document.documentElement.dataset.bsTheme === 'light');
    assert.equal(await page.locator('html').getAttribute('data-bs-theme'), 'light');
    await page.screenshot({
      path: path.join(process.env.TEMP, 'ganhos-desktop.png'),
      fullPage: true,
    });
    await page.setViewportSize({ width: 360, height: 800 });
    await page.locator('[data-mode="shift"]').click();
    await fill({ revenue: '200', distance: '120', consumption: '12', fuelPrice: '6' });
    await submit();
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      true,
    );
    assert.equal(await page.locator('input:not([aria-describedby])').count(), 0);
    await page.locator('#theme').click();
    await page.locator('#theme').click();
    await page.screenshot({
      path: path.join(process.env.TEMP, 'ganhos-mobile-dark.png'),
      fullPage: true,
    });
    await page.setViewportSize({ width: 320, height: 700 });
    await page.evaluate(() => window.scrollTo(0, 600));
    assert.equal(Math.round((await page.locator('.site-header').boundingBox()).y), 0);
    assert.ok((await page.locator('#theme').boundingBox()).y < 100);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      true,
    );
    const isolated = await browser.newContext();
    await isolated.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new Error('Storage blocked');
        },
      });
    });
    const blocked = await isolated.newPage();
    await blocked.goto(baseUrl, { waitUntil: 'networkidle' });
    await blocked.locator('#theme').click();
    await blocked.locator('#theme').click();
    assert.equal(await blocked.locator('html').getAttribute('data-bs-theme'), 'dark');
    await isolated.close();
    assert.deepEqual(errors, []);
    console.log(
      'PASS: three flows, invalid fields, reset, themes, storage blocked, mobile 320/360px and no JS errors.',
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
