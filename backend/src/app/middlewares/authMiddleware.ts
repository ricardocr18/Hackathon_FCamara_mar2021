import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayloadInterface {
  id: number;
  name: string;
  type: string;
  iat: number;
  exp: number;
}

function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, String(process.env.JWT_SECRET));

    const { id, type } = data as TokenPayloadInterface;

    if (type === 'parent') {
      req.parentId = id;
      req.storeId = 0;
    } else {
      req.storeId = id;
      req.parentId = 0;
    }
  } catch {
    return res.sendStatus(401);
  }

  return next();
}

export default AuthMiddleware;
