import { model, Schema } from 'mongoose';
import Student from './modelsControllers/studentCtrl.js';


const _schema = new Schema({
  sName: { type: String },
  sUserName: { type: String },
  sEmail: { type: String, unique: true },
  sPassword: { type: String },
  sClass: [{ type: Schema.ObjectId, ref: 'Classroom' }],
}, {
  timestamps: true,
});

_schema.loadClass(Student);

export default model('Student', _schema);
