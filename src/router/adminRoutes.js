import { Router } from 'express';
import debug from 'debug';
import { testAuth } from '../helper/extraHelper.js';
import { adminSignOut, loginAdmin, registerAdmin } from '../controllers/adminCtrls.js';
import { loginRules, registerRules, validate } from '../helper/validators.js';
import { adminAuth } from '../middleware/errorMiddleware.js';
import { createEditClassRoom, deleteClassRoom } from '../controllers/adminClassRoomCtrls.js';

const log = debug('app:adminRoutes -> ');

const adminRoutes = new Router();

adminRoutes.get('/', testAuth);

adminRoutes.post('/', registerRules(), validate, registerAdmin);

adminRoutes.post('/login', loginRules(), validate, loginAdmin);

adminRoutes.get('/logout', adminSignOut);

adminRoutes.post('/addClassRoom', adminAuth, createEditClassRoom );

adminRoutes.delete('/deleteClass/:id', adminAuth, deleteClassRoom);
export default adminRoutes;
