import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, CookieOptions } from 'express';

import { expressEnv, jwtSecret } from '../../../utils/environmentChecks.js';
import { AuthenticatedRequest } from 'server/app/modelsTypes/types.js';

interface CustomRequest extends Request {
	userId?: string;
	name?: string;
}

const inProduction: boolean = expressEnv === 'production';

export const jwtOptions: CookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: inProduction ? 'strict' : 'none',
	maxAge: 60 * 60 * 1000,
	path: '/',
};

export function generateToken(userId: string, name: string): string {
	return jwt.sign({ userId, name }, jwtSecret, { expiresIn: '1h' });
}

export function setToken(res: Response, token: string): void {
	res.cookie('token', token, jwtOptions);
}

export function clearToken(res: Response): void {
	res.clearCookie('token', jwtOptions);
}

export function validateToken(
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	const token = req.cookies?.token;

	if (!token) {
		res.status(401).json({ message: 'No token provided' });
		return;
	}

	try {
		const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
		req.user = {
			userId: decoded.userId,
			name: decoded.name,
			...decoded,
		};
		next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ message: 'Invalid token' });
		} else if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({ message: 'Expired token' });
		} else {
			return res.status(500).json({ message: 'Internal server error' });
		}
	}
}
