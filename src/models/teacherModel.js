import { model, Schema } from 'mongoose';
import Teacher from './modelsControllers/teacherCtrl.js';


const _schema = new Schema({
  tName: { type: String },
  tUserName: { type: String },
  tEmail: { type: String },
  tPassword: { type: String },
  tClass: [{ type: Schema.ObjectId, ref: 'Classroom' }],
}, {
  timestamps: true,
});

_schema.loadClass(Teacher);

export default model('Teacher', _schema);
