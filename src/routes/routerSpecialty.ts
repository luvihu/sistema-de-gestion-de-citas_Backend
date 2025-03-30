import { Router } from "express";
import { getSpecialty, getIdSpecialty, postSpecialty, putSpecialty, deleteSpecialty } from "../controllers/specialtyController";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";

const routerSpecialty = Router();

routerSpecialty.post('/create', authMiddleware, isAdmin, postSpecialty)
routerSpecialty.delete('/:id', authMiddleware, isAdmin, deleteSpecialty)
routerSpecialty.put('/:id', authMiddleware, isAdmin, putSpecialty)

routerSpecialty.get('/', authMiddleware, getSpecialty)
routerSpecialty.get('/:id', authMiddleware, getIdSpecialty)

export default routerSpecialty;