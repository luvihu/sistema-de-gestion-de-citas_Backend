import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization?.split(' ')[1];  // Extrae el token del header Authorization
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string }; // Usar la variable de entorno
   req.body.userId = decoded;  // Aquí asignas usuario decodificado a req.body.userId
     next();
  } catch (error) {
    return res.status(401).json({ message: 'Token de autenticación inválido' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): any => {
  const reqAdmin = req.body.userId.role;
    if (reqAdmin !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
  }
  next();
};

// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
//   const token = req.headers.authorization?.split(' ')[1];  // Extrae el token del header Authorization
//   if (!token) {
//     return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
//   }
//   try {
//     const decoded = jwt.verify(token, 'secret_key') as { id: string; role: string }; // Verifica el token con la clave secreta
//    req.body.userId = decoded;  // Aquí asignas usuario decodificado a req.body.userId
//      next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Token de autenticación inválido' });
//   }
// };

// export const isAdmin = (req: Request, res: Response, next: NextFunction): any => {
//   const reqAdmin = req.body.userId.role;
//     if (reqAdmin !== 'ADMIN') {
//     return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
//   }
//   next();
// };

