import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';

describe('Checkbox Count and Text Verification Test', () => {
	let browser: Browser;
	let page: Page;
	let checkedCount: number = 0;

	beforeAll(async () => {
		browser = await puppeteer.launch({ headless: true });
		page = await browser.newPage();
	});

	it('should count 100 checkboxes and record the number of checked boxes', async () => {
		await page.goto('http://localhost:5173/');

		const checkboxes = await page.$$('input[type="checkbox"]');
		const totalCheckboxes = checkboxes.length;

		checkedCount = await page.evaluate(() => {
			const checkboxes = document.querySelectorAll('input[type="checkbox"]');
			return Array.from(checkboxes).filter(
				(checkbox): checkbox is HTMLInputElement =>
					checkbox instanceof HTMLInputElement && checkbox.checked
			).length;
		});

		console.log(`Total number of checkboxes: ${totalCheckboxes}`);
		console.log(`Number of checked checkboxes: ${checkedCount}`);

		expect(totalCheckboxes).toBe(100);
	});

	afterAll(async () => {
		if (browser) {
			await browser.close();
		}
	});
});
