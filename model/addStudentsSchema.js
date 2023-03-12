const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
 
// student Registration Schema
const AddStudentsSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    regdate: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    }
})

autoIncrement.initialize(mongoose.connection);
AddStudentsSchema.plugin(autoIncrement.plugin, 'AddStudent');

const AddStudent = mongoose.model('AddStudent',AddStudentsSchema);
module.exports = AddStudent;