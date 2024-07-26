import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import dotenv from 'dotenv';
dotenv.config();

interface CustomRequest extends Request {
	userId?: string;
}

const protectedRouter = express.Router();

protectedRouter.get('/protected', verifyToken, (req: CustomRequest, res: Response) => {
	res.json({ message: 'This is a protected route', userId: req.userId });
});

protectedRouter.post('/sign-out', (req: Request, res: Response) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: true,
		sameSite: process.env.VITE_NODE_ENV === 'production' ? 'strict' : 'none',
	});
	res.status(200).json({ message: 'Logged out successfully' });
});

export default protectedRouter;
