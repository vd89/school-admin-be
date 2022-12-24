import { Router } from 'express';
import debug from 'debug';
import { testAuth } from '../helper/extraHelper.js';

const log = debug('app:studentRoute -> ');

const studentRoute = new Router();

studentRoute.get('/', testAuth);

export default studentRoute;
