import { Router } from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";
import { getAppointm, getAppointmOnly, postAppointm, putAppointm, deleteAppointm } from "../controllers/appointmController";

const routerAppointm: Router = Router();

routerAppointm.get('/', authMiddleware, isAdmin, getAppointm);
routerAppointm.delete('/:id', authMiddleware, isAdmin, deleteAppointm);

routerAppointm.get('/:id',authMiddleware, getAppointmOnly);
routerAppointm.post('/schedule',authMiddleware, postAppointm);
routerAppointm.put('/change', authMiddleware, putAppointm);

export default routerAppointm;