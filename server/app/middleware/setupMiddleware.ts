import { Express } from 'express'

import setupCors from './components/cors'
import setupGeneralMiddleware from './components/generalMiddleware'

export default function setupMiddleware(app: Express) {
	setupGeneralMiddleware(app)
	setupCors(app);
}