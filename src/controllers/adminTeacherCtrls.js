import debug from 'debug';
import { isValidObjectId } from 'mongoose';
import { encrypt } from '../helper/encryptionHelper.js';
import Teacher from '../models/teacherModel.js';

const logger = debug('app:adminTeaCtrl -> ');

export const createEditTeacher = async (req, res, next) => {
  try {
    const { tName, tUserName, tEmail, tPassword } = req.body;
    const hasPass = await encrypt(tPassword);
    const options = { tName, tUserName, tEmail, tPassword: hasPass };
    const isTeacher = await Teacher.findOne({ tEmail });
    if (!isTeacher) {
      const newTeacher = await Teacher.createTeacher(options);
      newTeacher.tPassword = undefined;
      return res.ok({ message: 'SUCCESS_TEACHER_CREATED', data: newTeacher });
    }

    const updateTea = await Teacher.findOneAndUpdate({ tEmail },
        { $set: { tName, tUserName: tUserName, tEmail: tEmail } },
        { new: true });
    updateTea.tPassword = undefined;
    return res.ok({ message: 'SUCCESS_TEACHER_UPDATED', data: updateTea });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const { teId } = req.params;
    if (!isValidObjectId(teId)) {
      return res.error('Teacher Id is wrong');
    }
    const isTeacher = await Teacher.findById(teId);
    if (!isTeacher) {
      return res.error('Teacher already deleted');
    }
    await Teacher.findByIdAndDelete({ _id: teId });
    return res.ok({ message: 'TEACHER_DELETED' });
  } catch (err) {
    logger(err);
    next(err);
  }
};

export const getAllTeachers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const allTeachers = await Teacher.find()
        .sort({ createdAt: -1 })
        .select({ tName: 1, tUserName: 1, tEmail: 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    const count = await Teacher.countDocuments();
    return res.ok({
      message: 'SUCCESS_ALL_TEACHERS',
      data: {
        allStudents: allTeachers,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};
