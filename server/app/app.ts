import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

import setupMiddleware from './middleware/middleware.js';
setupMiddleware(app);

import publicRouter from './routes/public.js';
app.use('/api', publicRouter);

import protectedRouter from './routes/protected.js';
app.use('/api', protectedRouter);

export default app;
