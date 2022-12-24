import { model, Schema } from 'mongoose';
import Teacher from './modelsControllers/teacherCtrl.js';


const _schema = new Schema({
  teacherName: { type: String },
  teacherUserName: { type: String },
  teacherEmail: { type: String },
  teacherPassword: { type: String },
  teacherAge: { type: Number },
  teacherClass: [{ type: Schema.ObjectId, ref: 'Classroom' }],
}, {
  timestamps: true,
});

_schema.loadClass(Teacher);

export default model('Teacher', _schema);
