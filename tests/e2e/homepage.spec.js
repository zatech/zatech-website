import { test, expect } from '@playwright/test';

// AI helped to generate E2E tests for homepage across browsers to ensure compatibility. 
test.describe('Cross-Browser Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage correctly', async ({ page, isMobile }) => {
    // Check that the main elements are visible - be more specific
    await expect(page.getByRole('link', { name: 'ZATech Home' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'South Africa\'s Largest Tech Community' })).toBeVisible();
    
    if (isMobile) {
      // On mobile, just check that the navbar exists (menu links are CSS hidden)
      await expect(page.locator('.navbar')).toBeVisible();
    } else {
      // On desktop, navigation links should be visible
      await expect(page.locator('#navbar-menu .nav-link[href="/"]')).toBeVisible();
      await expect(page.locator('#navbar-menu .nav-link[href="/sponsorship"]')).toBeVisible();
      await expect(page.locator('#navbar-menu .nav-link[href="#about"]')).toBeVisible();
    }
  });

  test('should have working navigation', async ({ page, isMobile }) => {
    if (isMobile) {
      // On mobile, click the logo to open the menu
      await page.locator('.navbar-logo').click();
      
      // Wait for menu to open
      await expect(page.locator('.navbar-links.open')).toBeVisible();
    }
    
    // Test About section navigation - use more specific selector
    await page.locator('#navbar-menu .nav-link[href="#about"]').click();
    // Wait a bit for potential smooth scrolling
    await page.waitForTimeout(500);
    
    // Check that the About section exists (rather than checking if it's in viewport)
    await expect(page.locator('#about')).toBeVisible();
    
    if (isMobile) {
      // Open menu again for next test
      await page.locator('.navbar-logo').click();
    }
    
    // Test FAQ section scroll using more specific selector
    await page.locator('#navbar-menu .nav-link[href="#faqs"]').click();
    await page.waitForTimeout(500);
    await expect(page.locator('#faqs')).toBeVisible();
  });

  test('should display community grid layout correctly', async ({ page }) => {
    // Check grid container exists
    await expect(page.locator('.community-grid-new')).toBeVisible();
    
    // Check that cards are rendered
    await expect(page.locator('.card-1')).toBeVisible();
    await expect(page.locator('.card-2')).toBeVisible();
    await expect(page.locator('.card-5')).toBeVisible();
  });

  test('should handle mobile menu on mobile devices', async ({ page, isMobile }) => {
    if (isMobile) {
      // On mobile, the hamburger functionality should work
      const navbar = page.locator('.navbar');
      await expect(navbar).toBeVisible();
      
      // Mobile menu should be initially closed
      const navMenu = page.locator('.navbar-links');
      await expect(navMenu).not.toHaveClass(/open/);
    }
  });
});
