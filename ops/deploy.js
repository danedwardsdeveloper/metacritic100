const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Function to execute shell commands
function runCommand(command) {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error: ${error.message}`);
				return reject(error);
			}
			if (stderr) {
				console.error(`stderr: ${stderr}`);
				return reject(new Error(stderr));
			}
			resolve(stdout);
		});
	});
}

// Main deploy function
async function deploy() {
	try {
		// Check and log environment variables (your existing code here)
		console.log('Environment variables checked and logged.');

		// Ask for confirmation
		const answer = await new Promise((resolve) => {
			rl.question(
				'Do you want to proceed with the build and deployment? (y/n) ',
				resolve
			);
		});

		if (answer.toLowerCase() !== 'y') {
			console.log('Deployment cancelled.');
			rl.close();
			return;
		}

		// Build the app
		console.log('Building the app...');
		await runCommand('npm run build');

		// Deploy to Fly
		console.log('Deploying to Fly...');
		await runCommand('fly deploy');

		console.log('Deployment completed successfully!');
	} catch (error) {
		console.error('Deployment failed:', error);
	} finally {
		rl.close();
	}
}

deploy();
