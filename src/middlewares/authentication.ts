import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authentcationHeader = req.headers.authorization;

  if (!authentcationHeader)
    return res.status(401).json({ message: 'Token not provided.' });

  next();
}

export { authMiddleware };
