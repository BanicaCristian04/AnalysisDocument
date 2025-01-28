const { test, expect } = require('@playwright/test');

test.describe('Authentication Tests', () => {
  test('Successful Login with Email and populated history', async ({ page }) => {

    await page.goto('http://localhost:3000/');

    const historyContainer = page.locator('.history-container');
    await expect(historyContainer).toBeVisible();

    const historyItems = page.locator('.history-item');
    const itemCountBeforeLogin = await historyItems.count();
    expect(itemCountBeforeLogin).toBe(0); 

    await page.goto('http://localhost:3000/auth/login');
    await page.fill('input[placeholder="Email address*"]', 'test@example.com');
    await page.fill('input[placeholder="Password*"]', 'parola123');
    await page.click('button:has-text("Continue")');

    const logoutButton = page.locator('text=Logout');
    await expect(logoutButton).toBeVisible();

    const itemCountAfterLogin = await historyItems.count();
    expect(itemCountAfterLogin).toBeGreaterThan(0); 
  });

  test('Unsuccessful Login with Invalid Credentials', async ({ page }) => {

    await page.goto('http://localhost:3000/auth/login');

    await page.fill('input[placeholder="Email address*"]', 'wronguser@example.com');
    await page.fill('input[placeholder="Password*"]', 'wrongpassword');

    await page.click('button:has-text("Continue")');

    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toHaveText("Invalid credentials");
  });
});
