const express = require('express');
const router = express.Router();
var attdata
// connecting to database
require('../db/conn');

// env 
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
CLSID = process.env.CLSID;



// Imports Models - Schema's
const Admission = require('../model/admissionSchema');
const AddStudent = require('../model/addStudentsSchema');
const attendences = require('../model/attsheetSchema');

// Routes starts here 
router.get('/', async (req, res) => {
    res.send("Home page")
})
const getdata=async()=>{
    attdata= await attendences.find()
    // console.log(attdata)
   }
   getdata()
router.get('/attendence', async (req, res) => {
        res.send(attdata)
})

router.get('/attendence/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const allStudentsFees = await attendences.find();
        // let data = JSON.parse(allStudentsFees);
        
        var data = allStudentsFees.filter(function (e) {
            // console.log(e.year);
            // return e.clsid;
        });
        

        return res.status(200).json(allStudentsFees);
      } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
      }
        
})

// admission
router.post('/admission/admissionform', async (req, res) => {
    console.log('I am Admission Route');

    // taking value from user through form
    const { name, email, phone, regdate, gender, division } = req.body;

    if (!name || !email || !phone || !regdate || !gender || !division) {
        return res.status(422).json({ Error: 'fill fields properly' });
    }

    try {

        const newAdmission = new Admission({
            name: name,
            email: email,
            phone: phone,
            regdate: regdate,
            gender: gender,
            division: division
        });
        const result = await newAdmission.save();
        console.log(result);
        return res.status(201).json({ message: 'New User registered successfully' });

    } catch (error) {
        console.log(error);
    }
})

// add Students
router.post('/students/addstudents', async (req, res) => {
    console.log('I am Add Students Route');

    // taking value from user through form
    const { name, email, phone, regdate, gender, division } = req.body;

    if (!name || !email || !phone || !regdate || !gender || !division) {
        return res.status(422).json({ Error: 'fill fields properly' });
    }

    try {

        const newStudent = new AddStudent({
            name: name,
            email: email,
            phone: phone,
            regdate: regdate,
            gender: gender,
            division: division
        });
        const result = await newStudent.save();
        console.log(result);
        return res.status(201).json({ message: 'New Student registered successfully' });

    } catch (error) {
        console.log(error);
    }
})

// view All Students Data
router.get('/students/viewstudents', async (req, res) => {

    console.log('I am View All Student Data Route');

    try {

        const students = await AddStudent.find({});
        console.log(students);
        return res.status(200).json(students);

    } catch (error) {
        console.log(error);
    }
})

// get Single Student Data
router.get('/students/getstudents/:id', async (req, res) => {

    console.log('I am get Single student Data Route');

    try {
        
        // getting the id that is passed in url
        const id = req.params.id; 
        const student = await AddStudent.find({_id:id});
        console.log(id);
        console.log(student);
        return res.status(200).json(student);

    } catch (error) {
        console.log(error);
    }
})

// update Student data
router.post('/students/updatestudents', async (req, res) => {

    console.log('I am Update Students Page');

    // taking value from user through form
    const {_id, name, email, phone, regdate, gender, division } = req.body;
    console.log(_id);

    if (!_id || !name || !email || !phone || !regdate || !gender || !division) {
        return res.status(422).json({ Error: 'fill fields properly' });
    }

    try {

        const updatedStudent = await AddStudent.updateOne({_id:_id} , {
            $set: {
                _id: _id,
                name: name,
                email: email,
                phone: phone,
                regdate: regdate,
                gender: gender,
                division: division
            }
        });
        console.log(updatedStudent);
        return res.status(201).json({ message: 'User updated successfully' });

    } catch (error) {
        console.log(error);
    }
})

// delete Student data
router.post('/students/deletestudents', async (req, res) => {

    console.log('I am delete student Data Route');

    const {_id } = req.body;
    console.log(_id);

    if (!_id) {
        return res.status(422).json({ Error: 'fill fields properly' });
    }

    try {
        
        const deletedStudent = await AddStudent.deleteOne({_id:_id});
        console.log(deletedStudent);
        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.log(error);
    }
})

module.exports = router