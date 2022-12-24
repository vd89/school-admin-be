import { model, Schema } from 'mongoose';
import Student from './modelsControllers/studentCtrl.js';


const _schema = new Schema({
  studentName: { type: String },
  studentUserName: { type: String },
  studentEmail: { type: String },
  studentPassword: { type: String },
  studentAge: { type: Number },
  studentClass: [{ type: Schema.ObjectId, ref: 'Classroom' }],
}, {
  timestamps: true,
});

_schema.loadClass(Student);

export default model('Student', _schema);
