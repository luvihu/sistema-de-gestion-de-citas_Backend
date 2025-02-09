import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization?.split(' ')[1];  // Extrae el token del header Authorization
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }
  try {
    const decoded = jwt.verify(token, 'secret_key') as { id: string; role: string }; // Verifica el token con la clave secreta
   req.body.userId = decoded.id;  // Aquí asignas el id del usuario decodificado a `req.body.userId`
   req.body.role = decoded.role;  // Aquí asignas el rol decodificado a `req.body.role` 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticación inválido' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): any => {
   if (req.body.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
  }
  next();
};

