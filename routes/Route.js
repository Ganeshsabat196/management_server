import express from "express";

// controllers
import { getStudents, getStudent, getFilteredStudent, addStudent, editStudent, deleteStudent } from "../controller/StudentsController.js";
import { getStudentsFees, getStudentFees, addStudentsFees, editInstallment, deleteInstallment } from "../controller/StudentFeesController.js";
import { addStudentsTest, getStudentsTest, getStudentTest, editStudentTest, deleteTest, getFilteredTests } from "../controller/StudentTestController.js";
import { getStandards,getDistinctStandards,getDistinctSections, addStandard, addSection, getSections } from "../controller/MoreController.js";

// middleware
import { storage,upload } from "../middleware/StudentMiddleware.js";
import { getAttendence,addAttendence } from "../controller/StudentAttendenceController.js";

const route = express.Router();
// students
route.post('/student/getstudent', getStudent); // single student based on id
route.get('/student/getstudents', getStudents); // all students
route.post('/student/getfilteredstudent', getFilteredStudent);// multiple students based on section and division
route.post('/student/addstudent',upload.single(["profile"]), addStudent);
route.post('/student/editstudent', editStudent);
route.post('/student/deletestudent', deleteStudent);

// attendence
route.get('/attendence/getattendence', getAttendence);
route.post('/attendence/addattendence', addAttendence);
// route.post('/attendence/editattendence', editAttendence);
// route.post('/attendence/deleteattendence', deleteAttendence);

// student fees
route.get('/studentsfees/getstudentsfees', getStudentsFees);
route.post('/studentsfees/getstudentfees', getStudentFees);
route.post('/studentsfees/addstudentsfees', addStudentsFees);
// route.post('/studentsfees/deletestudentsfees', deleteStudentsFees);

// student installment
route.post('/studentsfees/editinstallment', editInstallment);
route.post('/studentsfees/deletestudentsinstallment', deleteInstallment);

// student test
route.get('/studentstest/getstudentstest', getStudentsTest);
route.post('/studentstest/getstudenttest', getStudentTest);
route.post('/studentstest/addstudentstest', addStudentsTest);
route.post('/studentstest/getfilteredtests', getFilteredTests);

route.post('/studentstest/editstudenttest', editStudentTest);
route.post('/studentstest/deletetest', deleteTest);

// more
route.get('/more/getstandards', getStandards);
route.get('/more/getdistinctstandards', getDistinctStandards);
route.post('/more/addstandard', addStandard);

route.get('/more/getsections', getSections);
route.get('/more/getdistinctsections', getDistinctSections);
route.post('/more/addsection', addSection);

export default route;