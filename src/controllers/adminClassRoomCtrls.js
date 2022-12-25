import debug from 'debug';
import { isValidObjectId } from 'mongoose';
import ClassRoom from '../models/classroomModel.js';

const logger = debug('app:adminClRCtrl -> ');

export const createEditClassRoom = async (req, res, next) => {
  try {
    const { classRoomName, studentCount, subject } = req.body;
    const options = { classRoomName, studentCount, subject };
    let isClassRoom = await ClassRoom.findOne({ classRoomName });
    if (!isClassRoom) {
      const newClassRoom = await ClassRoom.createClassRoom(options);
      return res.ok({ message: 'SUCCESS_CREATED', data: newClassRoom });
    }
    const editData = {
      numberOfStudent: studentCount,
      classSubject: subject,
    };
    isClassRoom = await ClassRoom.findOneAndUpdate({ classRoomName }, { $set: editData }, { new: true });
    return res.ok({ message: 'SUCCESS_UPDATED', data: isClassRoom });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const deleteClassRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.error('Class Room ID is wrong');
    }
    const isClassRoom = await ClassRoom.findById(id);
    if (!isClassRoom) {
      return res.error('ClassRoom already deleted');
    }
    await ClassRoom.findByIdAndDelete({ _id: id });
    return res.ok({ message: 'CLASS_ROOM_DELETED' });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};
