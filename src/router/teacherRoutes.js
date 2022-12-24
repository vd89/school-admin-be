import { Router } from 'express';
import debug from 'debug';
import { testAuth } from '../helper/extraHelper.js';

const log = debug('app:teacherRoutes -> ');

const teacherRoutes = new Router();

teacherRoutes.get('/', testAuth);

export default teacherRoutes;
