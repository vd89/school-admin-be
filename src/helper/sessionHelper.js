import _ from 'lodash';

import appConfig from '../appConfig.js';
import { generateRandomString } from './encryptionHelper.js';

const { sessionSecret } = appConfig;

const oneDay = 1000 * 60 * 60 * 24;
const usedKey = generateRandomString(16);

export const sessionConfig = {
  key: usedKey,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookies: { maxAge: oneDay, sameSite: 'none', httpOnly: true },
};

export const sessionClear = (req, res, next) => {
  if (req.cookies['school-admin-be'] && !req.session.user) {
    res.clearCookie('school-admin-be');
  }
  next();
};

export const sessionCheck = (req, res, next) => {
  const { cookies, session } = req;

  const check =
   !_.isEmpty(cookies) &&
   cookies.school-admin-be &&
   _.isString(cookies.school-admin-be) &&
   cookies.school-admin-be.includes(session.id) &&
   session.user;
  if (check) {
    next();
  } else return res.status(403).error('USER_IS_NOT_AUTHORIZED');
};
