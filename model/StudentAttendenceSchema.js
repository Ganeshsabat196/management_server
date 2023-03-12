const mongoose = require('mongoose');

const StudentAttendenceSchema =  new mongoose.Schema({
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

const StudentAttendence = mongoose.model('StudentAttendence',StudentAttendenceSchema)
module.exports = StudentAttendence;