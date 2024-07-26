// Server
import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

function processVariable(variable: string): string {
    const value = process.env[variable];
    if (!value) throw new Error(chalk.red(`${variable} not set`));

    const isSecret = variable.toLowerCase().includes('secret');
    console.log(`${variable}: ${chalk.blue(isSecret ? `${value.slice(0, 6)}...` : value)}`);
    return value;
}

function processAllowedOrigins(origins: string, environment: string): string | string[] {
    const value = process.env[origins];

    if (value == null) {
        throw new Error(chalk.red(`${origins} not set`));
    }

    console.log('Allowed origins:');
    const originArray = value.split(',').map(origin => origin.trim());
    const inProduction: boolean = environment === 'production';
    originArray.forEach(origin => console.log(
        chalk.blue(`- ${inProduction ? origin : chalk.strikethrough(origin)}`)
    ));

    !inProduction && console.log(chalk.blue(`- ${developmentUrl}`));
    return inProduction ? originArray : developmentUrl;
}


// Strings
export const expressEnv = processVariable('EXPRESS_ENV');
export const jwtSecret = processVariable('EXPRESS_JWT_SECRET');
export const deployedFlyUrl = processVariable('EXPRESS_DEPLOYED_FLY_URL');
export const deployedCustomUrl = processVariable('EXPRESS_DEPLOYED_CUSTOM_URL');
export const developmentUrl = processVariable('EXPRESS_DEVELOPMENT_URL');

// Numbers
export const port: number = parseInt(processVariable("EXPRESS_PORT"), 10);

// Arrays
export const allowedOrigins = processAllowedOrigins("EXPRESS_ALLOWED_ORIGINS", expressEnv);

// Log URLs
expressEnv === 'development' && console.log(`API available at: ${chalk.blue(`http://localhost:3000/api`)}`);
expressEnv === 'development' && console.log(`Front-end available at: ${chalk.blue(`http://localhost:5173/`)}`);

expressEnv === 'build' && console.log(`API available at: ${chalk.blue(`http://localhost:3000/api`)}`);
expressEnv === 'build' && console.log(`Front-end available at: ${chalk.blue(`http://localhost:3000/`)}`);

expressEnv === 'production' && console.log(`API available at: \n - ${chalk.green(`${deployedFlyUrl}/api`)}\n - ${chalk.green(`${deployedCustomUrl}/api`)}`);
expressEnv === 'production' && console.log(`Front-end available at: \n - ${chalk.green(`${deployedFlyUrl}`)}\n - ${chalk.green(`${deployedCustomUrl}`)}`);


