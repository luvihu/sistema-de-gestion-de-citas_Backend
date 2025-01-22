import { Router } from "express";
import { getDoctor, getIdDoctor, postDoctor, putDoctor, deleteDoctor } from "../controllers/doctorController";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";
const routerDoctor: Router = Router();

routerDoctor.get('/',authMiddleware, getDoctor)
routerDoctor.get('/:id',authMiddleware, getIdDoctor)
routerDoctor.post('/create',authMiddleware, isAdmin, postDoctor)
routerDoctor.delete('/:id',authMiddleware, isAdmin, deleteDoctor)
routerDoctor.put('/:id',authMiddleware, isAdmin, putDoctor)

export default routerDoctor;