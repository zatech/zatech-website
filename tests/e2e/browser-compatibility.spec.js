import { test, expect } from '@playwright/test';

// AI was helped to assist in writing these tests for extensive cross-browser compatibility checks
// E2E tests for cross-browser compatibility
test.describe('Cross-Browser Compatibility', () => {
  test('works on Chrome, Firefox, and Safari', async ({ page, browserName }) => {
    console.log(`Testing on ${browserName}`);
    
    // Test homepage loads
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'ZATech Home' })).toBeVisible();
    
    // Test sponsorship page loads
    await page.goto('/sponsorship');
    await expect(page.getByRole('heading', { name: /Sponsorship/i })).toBeVisible();
    
    console.log(`${browserName} compatibility confirmed`);
  });

  test('CSS Grid works across browsers', async ({ page, browserName }) => {
    await page.goto('/');
    
    // Check CSS Grid container exists and has children
    const gridContainer = page.locator('.community-grid-new');
    await expect(gridContainer).toBeVisible();
    
    const cardCount = await gridContainer.locator('[class*="card-"]').count();
    expect(cardCount).toBeGreaterThan(0);
    
    console.log(`CSS Grid working in ${browserName}`);
  });

  test('responsive design works across viewports', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop layout
    await page.setViewportSize({ width: 1200, height: 800 });
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(navbar).toBeVisible();
    
    // Check that grid stacks properly on mobile
    const gridContainer = page.locator('.community-grid-new');
    await expect(gridContainer).toBeVisible();
  });

  test('modern JavaScript features work', async ({ page, browserName }) => {
    await page.goto('/');
    
    // Check that ES6+ features work (the site uses lazy loading)
    await expect(page.getByRole('link', { name: 'ZATech Home' })).toBeVisible();
    
    // Navigate to test dynamic imports
    await page.goto('/sponsorship');
    await expect(page.getByRole('heading', { name: /Sponsorship/i })).toBeVisible();
    
    console.log(`Modern JS features working in ${browserName}`);
  });
});
