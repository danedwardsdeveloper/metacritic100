import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { jwtSecret } from '../../utils/environmentChecks.js'

interface CustomRequest extends Request {
	userId?: string;
}

interface JwtPayload {
	userId: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies?.token;

	if (!token) {
		res.status(401).json({ message: 'No token provided' });
		return;
	}

	jwt.verify(token, jwtSecret, (err: VerifyErrors | null, decoded: any) => {
		if (err) {
			res.status(401).json({ message: 'Invalid token' });
			return;
		}

		(req as CustomRequest).userId = (decoded as JwtPayload).userId;
		next();
	});
};
