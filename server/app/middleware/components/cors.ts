import { Express } from 'express';
import cors from 'cors';

import { allowedOrigins } from '../../../utils/environmentChecks.js';

export default function setupCors(app: Express) {
	app.use(
		cors({
			origin: allowedOrigins,
			methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
			allowedHeaders: ['Content-Type', 'Authorization'],
			credentials: true,
			optionsSuccessStatus: 200,
		})
	);
}
