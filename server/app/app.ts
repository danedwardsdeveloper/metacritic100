import express from 'express';

import { connectDB } from './database/database.js';
import setupMiddleware from './middleware/setupMiddleware.js';
import publicRouter from './routes/public.js';
import protectedRouter from './routes/protected.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
connectDB();
setupMiddleware(app);

app.use('/api', publicRouter);
app.use('/api', protectedRouter);

app.use(errorHandler);

export default app;
