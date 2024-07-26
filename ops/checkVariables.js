import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkEnvVariables = () => {
	const envFilePath = path.join(__dirname, '../', '.env');
	const data = fs.readFileSync(envFilePath, 'utf8');
	const lines = data.split('\n');

	const forbiddenValues = ['development', 'build'];

	for (const line of lines) {
		const [key, value] = line.split('=').map((part) => part.trim());
		if (key && value && forbiddenValues.includes(value)) {
			throw new Error(
				chalk.red(
					`Invalid value '${value}' for variable '${key}' in .env file.`
				)
			);
		}
	}

	console.log(chalk.green('All .env variables are valid.'));
	return true;
};

checkEnvVariables();
