import { Express } from 'express';

import setupCors from './components/cors.js';
import setupGeneralMiddleware from './components/generalMiddleware.js';

export default function setupMiddleware(app: Express) {
	setupGeneralMiddleware(app);
	setupCors(app);
}
