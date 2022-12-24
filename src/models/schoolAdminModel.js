import { model, Schema } from 'mongoose';
import SchoolAdmin from './modelsControllers/shAdminCtrl.js';


const _schema = new Schema({
  name: { type: String },
  userName: { type: String },
  email: { type: String },
  password: { type: String },
}, {
  timestamps: true,
});

_schema.loadClass(SchoolAdmin);

export default model('SchoolAdmin', _schema);
