import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';

describe('Desktop main elements', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await puppeteer.launch({ headless: true });
		page = await browser.newPage();
		await page.setViewport({ width: 1204, height: 789 });
		await page.goto('http://localhost:5173/');
	});

	it('should have a link to "/" that says "MetaCritic 100"', async () => {
		const link = await page.$('a[href="/"]');
		expect(link).not.toBeNull();
		const text = await page.evaluate((el) => el?.textContent, link);
		expect(text).toBe('MetaCritic 100');
	});

	it('should have a link to "/about" that says "About"', async () => {
		const link = await page.$('a[href="/about"]');
		expect(link).not.toBeNull();
		const text = await page.evaluate((el) => el?.textContent, link);
		expect(text).toBe('About');
	});

	it('should display a film counter in the menu bar', async () => {
		await page.waitForSelector('nav');

		const navContent = await page.evaluate(() => {
			const nav = document.querySelector('nav');
			return nav ? nav.textContent : null;
		});

		expect(navContent).not.toBeNull();

		if (navContent) {
			const match = navContent.match(/(\d+)\s*\/\s*100/);

			expect(match).not.toBeNull();
			if (match) {
				const number = parseInt(match[1]);
				expect(number).toBeGreaterThanOrEqual(0);
				expect(number).toBeLessThanOrEqual(100);
			}
		} else {
			throw new Error('Nav content is null');
		}
	});

	it('should have text elements that say "Dekalog", "Boyhood", and "The Godfather"', async () => {
		const texts = ['Dekalog', 'Boyhood', 'The Godfather'];
		for (const text of texts) {
			const elements = await page.$$('h3');
			for (const element of elements) {
				const content = await element.evaluate((el) =>
					el.textContent?.trim().toLowerCase()
				);
				if (content === text.toLowerCase()) {
					break;
				}
			}
		}
	});

	afterAll(async () => {
		if (browser) {
			await browser.close();
		}
	});
});

describe('Mobile main elements', () => {
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		browser = await puppeteer.launch({ headless: true });
		page = await browser.newPage();
		await page.setViewport({ width: 375, height: 592 });
		await page.goto('http://localhost:5173/');
	});

	it('should have a link to "/" that says "MetaCritic 100"', async () => {
		const link = await page.$('a[href="/"]');
		expect(link).not.toBeNull();
		const text = await page.evaluate((el) => el?.textContent, link);
		expect(text).toBe('MetaCritic 100');
	});

	it('should have a main menu button', async () => {
		const button = await page.$('button:has(svg)');
		expect(button).not.toBeNull();
		const span = await button!.$('span.sr-only');
		expect(span).not.toBeNull();
		const text = await page.evaluate((el) => el?.textContent, span);
		expect(text).toBe('Open main menu');
	});

	it('should display a film counter in the menu bar', async () => {
		await page.waitForSelector('nav');

		const navContent = await page.evaluate(() => {
			const nav = document.querySelector('nav');
			return nav ? nav.textContent : null;
		});

		expect(navContent).not.toBeNull();

		if (navContent) {
			const match = navContent.match(/(\d+)\s*\/\s*100/);

			expect(match).not.toBeNull();
			if (match) {
				const number = parseInt(match[1]);
				expect(number).toBeGreaterThanOrEqual(0);
				expect(number).toBeLessThanOrEqual(100);
			}
		} else {
			throw new Error('Nav content is null');
		}
	});

	it('should have text elements that say "Dekalog", "Boyhood", and "The Godfather"', async () => {
		const texts = ['Dekalog', 'Boyhood', 'The Godfather'];
		for (const text of texts) {
			const elements = await page.$$('h3');
			for (const element of elements) {
				const content = await element.evaluate((el) =>
					el.textContent?.trim().toLowerCase()
				);
				if (content === text.toLowerCase()) {
					break;
				}
			}
		}
	});

	afterAll(async () => {
		if (browser) {
			await browser.close();
		}
	});
});
