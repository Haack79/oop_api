
import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { config } from '../config';
import { NotAuthorizedError } from './CustomError';

export interface JwtPayload {
    email: string;
    userId: string;
    isAdmin: boolean;
}
interface CustomRequest extends Request {
    userData?: JwtPayload; // Define userData property
}

export class AuthMiddleware {
  public verifyToken(req: CustomRequest, _res: Response, next: NextFunction): void {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new NotAuthorizedError('Authorization token is missing.');
      }

      const decoded: JwtPayload = JWT.verify(token, config.JWT_KEY!) as JwtPayload;
      req.userData = decoded;
    } catch (error) {
      throw new NotAuthorizedError('Authentication failed. Please provide a valid token.');
    }
    next();
  }
  public isAdmin(req: CustomRequest, res: Response, next: NextFunction): Response | void {
    const user = req.userData;
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: 'Access forbidden. Admin privileges required.'
      });
    }
    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
