import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import getAuthToken from "../controllers/authTokenController";

const routerAuth: Router = Router();

routerAuth.get('/', authMiddleware, getAuthToken);

export default routerAuth;