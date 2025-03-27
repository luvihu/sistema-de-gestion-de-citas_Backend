import { VercelRequest, VercelResponse } from '@vercel/node';
import { AppDataSource } from '../config/dataSource';
import app from '../server';

// Inicializa TypeORM una sola vez (reutiliza conexiones)
let initialized = false;

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!initialized) {
    try {
      await AppDataSource.initialize();
      console.log('Database connected (Serverless)');
      initialized = true;
    } catch (error) {
      console.error('DB connection failed:', error);
      return res.status(500).json({ 
        error: 'Database connection failed',
        details: String(error)
   });
    }
  }

  // Pasa el control a Express
  return app(req, res);
};