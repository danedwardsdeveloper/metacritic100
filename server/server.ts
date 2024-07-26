import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

import { expressEnv, port } from './utils/environmentChecks.js';
import app from './app/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = app.listen(port, () => {
	const serveReactWithExpress: boolean = expressEnv !== 'development';

	if (serveReactWithExpress) {
		app.use(express.static(path.join(__dirname, '../client/')));
		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/index.html'));
		});
	}
});

export default server;
