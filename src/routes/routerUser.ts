import { Router } from 'express';
import { getUser, registerUser, loginUser,  getUserId, deleteUser, putUser } from '../controllers/userController';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware';
const routerUser = Router();

routerUser.get('/', authMiddleware, isAdmin, getUser);

routerUser.post('/register', registerUser);
routerUser.post('/login', loginUser);

routerUser.get('/:id', authMiddleware, getUserId);
routerUser.delete('/:id', authMiddleware, deleteUser);
routerUser.put('/:id', authMiddleware, putUser);


export default routerUser;

