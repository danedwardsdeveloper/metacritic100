import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { allowedOrigins } from '../../utils/environmentChecks.js';

const setupMiddleware = (app: Express) => {
	app.use(express.json());
	app.use(cookieParser());

	app.use(
		cors({
			origin: allowedOrigins,
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type', 'Authorization'],
			credentials: true,
		})
	);
};

export default setupMiddleware;
