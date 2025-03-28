import { VercelRequest, VercelResponse } from '@vercel/node';
import { AppDataSource } from '../config/dataSource';
import app from '../server';

// Inicializa TypeORM una sola vez (reutiliza conexiones)
let initialized = false;

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!initialized) {
    try {
      // Verificar si ya está inicializado para evitar múltiples intentos
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log('Database connected (Serverless)');
      }
      initialized = true;
    } catch (error) {
      console.error('DB connection failed:', error);
      return res.status(500).json({
        error: 'Database connection failed',
        details: process.env.NODE_ENV === 'production' ? 'Database error' : String(error)
      });
    }
  }

  // Manejo de errores durante la ejecución
  try {
    // Pasa el control a Express para manejar las solicitudes
    return app(req, res);
  } catch (error) {
    console.error('Request handling error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'production' ? 'Server error' : String(error)
    });
  }
};
