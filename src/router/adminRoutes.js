import { Router } from 'express';
import debug from 'debug';
import { testAuth } from '../helper/extraHelper.js';
import { adminSignOut, loginAdmin, registerAdmin } from '../controllers/adminCtrls.js';
import { loginRules, registerRules, validate } from '../helper/validators.js';
import { adminAuth } from '../middleware/errorMiddleware.js';
import { createEditClassRoom, deleteClassRoom, getAllClassRooms } from '../controllers/adminClassRoomCtrls.js';
import { createEditStudent, deleteStudent, getAllStudents } from '../controllers/adminStudentCtrls.js';
import { createEditTeacher, deleteTeacher, getAllTeachers } from '../controllers/adminTeacherCtrls.js';

const log = debug('app:adminRoutes -> ');

const adminRoutes = new Router();

adminRoutes.get('/', testAuth);

adminRoutes.post('/', registerRules(), validate, registerAdmin);

adminRoutes.post('/login', loginRules(), validate, loginAdmin);

adminRoutes.get('/logout', adminSignOut);

// add and edit classroom
adminRoutes.post('/addClassRoom', adminAuth, createEditClassRoom );
// delete classroom
adminRoutes.delete('/deleteClass/:id', adminAuth, deleteClassRoom);

// get All the Classrooms
adminRoutes.get('/classRooms', adminAuth, getAllClassRooms );

// add and edit the student
adminRoutes.post('/createStudent', adminAuth, createEditStudent);

// delete a student
adminRoutes.delete('/deleteStudent/:stId', adminAuth, deleteStudent);

// Get All Students
adminRoutes.get('/students', adminAuth, getAllStudents );

// add and edit the teacher
adminRoutes.post('/createTeacher', adminAuth, createEditTeacher );

// delete Teacher
adminRoutes.delete('/deleteTeacher/:teId', adminAuth, deleteTeacher);

// Get All Teachers
adminRoutes.get('/teachers', adminAuth, getAllTeachers);

// add student to the classroom
adminRoutes.post('/addStudentToClassRoom/:classRoomID/:stId', adminAuth);

// assign teacher to the classroom
adminRoutes.post('/addTeacherToClassRoom', adminAuth);


export default adminRoutes;
