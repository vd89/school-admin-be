import { model, Schema } from 'mongoose';
import ClassRoom from './modelsControllers/classroomCtrl.js';


const _schema = new Schema({
  classRoomName: { type: String },
  numberOfStudent: { type: Number, default: 0, max: 150 },
  classSubject: { type: String },
  teacherAssigned: { type: Schema.ObjectId, ref: 'Teacher' },
  studentAssigned: [{ type: Schema.ObjectId, ref: 'Student' }],
}, {
  timestamps: true,
});

_schema.loadClass(ClassRoom);

export default model('ClassRoom', _schema);
