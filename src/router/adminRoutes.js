import { Router } from 'express';
import debug from 'debug';
import { testAuth } from '../helper/extraHelper.js';

const log = debug('app:adminRoutes -> ');

const adminRoutes = new Router();

adminRoutes.get('/', testAuth);

export default adminRoutes;
