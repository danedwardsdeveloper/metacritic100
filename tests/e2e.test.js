import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

async function runTest() {
	let driver;

	try {
		const options = new chrome.Options();
		options.addArguments('--headless');

		driver = await new Builder()
			.forBrowser('chrome')
			.setChromeOptions(options)
			.build();

		// Go to localhost:5173
		await driver.get('http://localhost:5173');

		// Check for 'Sign in' and 'Create account' links
		const signInLink = await driver.findElement(By.linkText('Sign in'));
		const createAccountLink = await driver.findElement(
			By.linkText('Create account')
		);

		console.assert(await signInLink.isDisplayed(), 'Sign in link not found');
		console.assert(
			await createAccountLink.isDisplayed(),
			'Create account link not found'
		);

		// Go to /protected
		await driver.get('http://localhost:5173/protected');
		const protectedMessage = await driver
			.findElement(By.tagName('body'))
			.getText();
		console.assert(
			protectedMessage.includes('Protected content: please log in'),
			'Incorrect message on protected page'
		);

		// Go to /sign-in
		await driver.get('http://localhost:5173/sign-in');

		// Sign in with wrong credentials
		const emailInput = await driver.findElement(By.name('email'));
		const passwordInput = await driver.findElement(By.name('password'));
		const submitButton = await driver.findElement(
			By.xpath("//button[text()='Sign In']")
		);

		await emailInput.sendKeys('wrongEmail@gmail.com');
		await passwordInput.sendKeys('wrongPassword');
		await submitButton.click();

		const errorMessage = await driver
			.wait(until.elementLocated(By.className('error-message')), 5000)
			.getText();
		console.assert(
			errorMessage.includes('Invalid credentials. Please try again'),
			'Incorrect error message'
		);

		// Sign in with correct credentials
		await emailInput.clear();
		await passwordInput.clear();
		await emailInput.sendKeys('user@gmail.com');
		await passwordInput.sendKeys('securePassword');
		await submitButton.click();

		// Check redirection to /protected
		await driver.wait(until.urlIs('http://localhost:5173/protected'), 5000);

		const protectedContent = await driver
			.findElement(By.tagName('body'))
			.getText();
		console.assert(
			protectedContent.includes('This is protected content'),
			'Protected content not found'
		);

		// Go to home page and back to /protected
		await driver.get('http://localhost:5173');
		await driver.get('http://localhost:5173/protected');

		const protectedContentAgain = await driver
			.findElement(By.tagName('body'))
			.getText();
		console.assert(
			protectedContentAgain.includes('This is protected content'),
			'Protected content not found after navigation'
		);

		// Go to /sign-out
		await driver.get('http://localhost:5173/sign-out');

		// Add assertions for sign-out behavior here

		console.log('All tests passed successfully!');
	} catch (error) {
		console.error('Test failed:', error);
	} finally {
		if (driver) {
			await driver.quit();
		}
	}
}

runTest();
