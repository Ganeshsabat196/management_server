const mongoose = require('mongoose');

const attendenceSchema =  new mongoose.Schema({
    studentid:{
        type: String,
        required: true
    },
    attendences: [
        {
            date:{
                type: String,
                required: true
            },
            status:{
                type: String,
                required: true
            }
        }
    ]
})

const Attendence_student = mongoose.model('Attendence_student',attendenceSchema)
module.exports = Attendence_student;