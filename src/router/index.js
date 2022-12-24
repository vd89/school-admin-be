import { Router } from 'express';
import debug from 'debug';
import { testAuth } from '../helper/extraHelper.js';

import adminRoutes from './adminRoutes.js';
import studentRoute from './studentRoute.js';
import teacherRoutes from './teacherRoutes.js';

const log = debug('app:apiRoutes -> ');

const apiRoutes = new Router();

/*
 * Test Route
 */
apiRoutes.get('/v1/test', testAuth);

/*
 * All the Admin Routes from here
 */
apiRoutes.use('/v1/admin', adminRoutes);

/*
 * All the Students routes for here
 */
apiRoutes.use('/v1/student', studentRoute);

/*
 * All the Teacher routes for here
 */
apiRoutes.use('/v1/student', teacherRoutes);


export default apiRoutes;
