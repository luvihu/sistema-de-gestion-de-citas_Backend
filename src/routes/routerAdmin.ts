import { Router } from 'express';
import { isAdmin, authMiddleware } from '../middleware/authMiddleware';
import { getDashboard } from '../controllers/dashboardController';

const routerAdmin = Router();

routerAdmin.get('/', authMiddleware, isAdmin, getDashboard);

export default routerAdmin;