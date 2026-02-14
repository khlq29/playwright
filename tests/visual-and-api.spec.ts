import { test, expect } from '@playwright/test';

test.describe('Navigation and Assertions Demo', () => {
  test('should have correct page title', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');

    await expect(page).toHaveTitle('The Internet');
  });

  test('should navigate to checkboxes page and toggle', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');

    const checkbox1 = page.locator('#checkboxes input').first();
    const checkbox2 = page.locator('#checkboxes input').nth(1);

    // First checkbox is unchecked by default
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();

    // Toggle checkboxes
    await checkbox1.check();
    await checkbox2.uncheck();

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });

  test('should select dropdown options', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    const dropdown = page.locator('#dropdown');

    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');

    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
  });

  test('should take a screenshot', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');

    await page.screenshot({ path: 'test-results/screenshots/homepage.png', fullPage: true });
  });
});

test.describe('API Testing Demo', () => {
  test('should fetch a list of users', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');

    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(users.length).toBe(10);
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  test('should create a new post', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Playwright Test Post',
        body: 'This is a test post created by Playwright',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201);

    const post = await response.json();
    expect(post.title).toBe('Playwright Test Post');
  });
});
