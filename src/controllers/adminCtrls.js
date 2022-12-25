import SchoolAdmin from '../models/schoolAdminModel.js';
import debug from 'debug';
import { comparePassword, encrypt, generateAuthToken } from '../helper/encryptionHelper.js';

const logger = debug('app:adminCtrl -> ');


export const registerAdmin = async (req, res, next) => {
  try {
    const { name, userName, email, password } = req.body;
    const hashPass = await encrypt(password);
    const isUser = await SchoolAdmin.findOne({ email });
    if (!isUser) {
      const user = await SchoolAdmin.create({ name, userName, email, password: hashPass });
      user.password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      const token = await generateAuthToken(user._id);
      return res.ok({ message: 'SUCCESS', data: { user, token } });
    }
    return res.error({ message: 'Please go for Login' });
  } catch (err) {
    logger(err.message);
    next(err.message);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUser = await SchoolAdmin.findOne({ email });
    if (!isUser) {
      return res.error({ message: 'Not a valid user credentials ' });
    }
    const isPassword = await comparePassword(password, isUser.password);
    if (!isPassword) {
      return res.error({ message: 'Password incorrect' });
    }
    req.session.user = {
      name: isUser.name,
      _id: isUser.id,
      email: isUser.email,
    };
    const token = await generateAuthToken(isUser._id);
    isUser.password = undefined;
    isUser.createdAt = undefined;
    isUser.updatedAt = undefined;
    return res.ok({ message: 'LOGGED_IN_SUCCESS', data: { token, isUser } });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const adminSignOut = async (req, res, next) => {
  try {
    req.session.destroy();
    return res.ok('SIGNED_OUT_SUCCESS');
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

// helper for the auth
export const getUserData = async (id) => {
  try {
    return await SchoolAdmin.findById(id);
  } catch (err) {
    logger(err.message);
  }
};
