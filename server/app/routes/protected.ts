import express, { Request, Response } from 'express';

import { verifyToken } from '../middleware/verifyToken.js';
import { expressEnv } from '../../utils/environmentChecks.js';

interface CustomRequest extends Request {
	userId?: string;
}

const protectedRouter = express.Router();
protectedRouter.use(verifyToken);

protectedRouter.get('/protected', (req: CustomRequest, res: Response) => {
	res.json({ message: 'This is a protected route', userId: req.userId });
});

protectedRouter.post('/sign-out', (req: Request, res: Response) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: true,
		sameSite: expressEnv === 'production' ? 'strict' : 'none',
	});
	res.status(200).json({ message: 'Signed out successfully' });
});

export default protectedRouter;
