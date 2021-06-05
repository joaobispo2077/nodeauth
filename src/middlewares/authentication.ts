import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authentcationHeader = req.headers.authorization;

  if (!authentcationHeader)
    return res.status(401).json({ message: 'Token not provided.' });

  const [, token] = authentcationHeader.split(' ');

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as Record<string, string>;

    Object.assign(req, { id: decoded.id });
    return next();
  } catch (err) {
    if (err instanceof JsonWebTokenError)
      return res.status(401).json({ message: 'Invalid Token.' });

    return res.status(401).json({ message: 'UNAUTHORIZED.' });
  }
}

export { authMiddleware };
