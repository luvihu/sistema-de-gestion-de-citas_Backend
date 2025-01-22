import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }
  try {
    const decoded = jwt.verify(token, 'secret_key');
   req.body.userId = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticación inválido' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): any => {
  const user = req.body.userId;
  
  if (user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
  }
  next();
};

