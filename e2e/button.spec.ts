import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test.describe('Button Visual Regression', () => {
  test('default button variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const button = page.locator('#storybook-root button').first();
    await expect(button).toHaveScreenshot('button-default.png');
  });

  test('destructive button variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--destructive&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const button = page.locator('#storybook-root button').first();
    await expect(button).toHaveScreenshot('button-destructive.png');
  });

  test('outline button variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--outline&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const button = page.locator('#storybook-root button').first();
    await expect(button).toHaveScreenshot('button-outline.png');
  });

  test('secondary button variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--secondary&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const button = page.locator('#storybook-root button').first();
    await expect(button).toHaveScreenshot('button-secondary.png');
  });

  test('ghost button variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--ghost&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const button = page.locator('#storybook-root button').first();
    await expect(button).toHaveScreenshot('button-ghost.png');
  });

  test('link button variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--link&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const button = page.locator('#storybook-root button').first();
    await expect(button).toHaveScreenshot('button-link.png');
  });

  test('all button sizes', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--all-sizes&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const container = page.locator('#storybook-root > *').first();
    await expect(container).toHaveScreenshot('button-all-sizes.png');
  });

  test('all button variants', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--all-variants&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const container = page.locator('#storybook-root > *').first();
    await expect(container).toHaveScreenshot('button-all-variants.png');
  });

  test('loading button state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--loading&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const button = page.locator('#storybook-root button').first();
    await expect(button).toHaveScreenshot('button-loading.png');
  });

  test('disabled button state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--disabled&viewMode=story');
    await page.locator('#storybook-root button').first().waitFor({ state: 'visible' });
    const button = page.locator('#storybook-root button').first();
    await expect(button).toHaveScreenshot('button-disabled.png');
  });
});
