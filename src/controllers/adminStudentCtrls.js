import debug from 'debug';
import { isValidObjectId } from 'mongoose';
import { encrypt } from '../helper/encryptionHelper.js';
import Student from '../models/studentModel.js';

const logger = debug('app:adminStuCtrl -> ');

export const createEditStudent = async (req, res, next) => {
  try {
    const { sName, sUserName, sEmail, sPassword } = req.body;
    const hasPass = await encrypt(sPassword);
    const options = { sName, sUserName, sEmail, sPassword: hasPass };
    const isStudent = await Student.findOne({ sEmail });
    if (!isStudent) {
      const newStudent = await Student.createStudent(options);
      newStudent.sPassword = undefined;
      return res.ok({ message: 'SUCCESS_STUDENT_CREATED', data: newStudent });
    }

    const updateStu = await Student.findOneAndUpdate({ sEmail },
        { $set: { sName: sName, sUserName: sUserName, sEmail: sEmail } },
        { new: true });
    updateStu.sPassword = undefined;
    return res.ok({ message: 'SUCCESS_STUDENT_UPDATED', data: updateStu });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { stId } = req.params;
    if (!isValidObjectId(stId)) {
      return res.error('Student Id is wrong');
    }
    const isStudent = await Student.findById(stId);
    if (!isStudent) {
      return res.error('Student already deleted');
    }
    await Student.findByIdAndDelete({ _id: stId });
    return res.ok({ message: 'CLASS_ROOM_DELETED' });
  } catch (err) {
    logger(err);
    next(err);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const allStudents = await Student.find()
        .sort({ createdAt: -1 })
        .select({ sName: 1, sUserName: 1, sEmail: 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    const count = await Student.countDocuments();
    return res.ok({
      message: 'SUCCESS_ALL_STUDENTS',
      data: {
        allStudents,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};
