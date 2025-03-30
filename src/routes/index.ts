import { Router} from 'express';
import routerUser from './routerUser';
import routerAppointm from './routerAppointm';
import routerDoctor from './routerDoctor';
import routerSpecialty from './routerSpecialty';
import routerAdmin from './routerAdmin';
import routerAuth from './routerAuth';

const router = Router();

router.use('/admin', routerAdmin);
router.use('/users', routerUser);
router.use('/appointments', routerAppointm);
router.use('/doctor', routerDoctor);
router.use('/specialty', routerSpecialty);
router.use('/verifyToken', routerAuth);

export default router; 