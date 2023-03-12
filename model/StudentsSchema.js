import mongoose from 'mongoose'

// student Registration Schema
const StudentsSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    gender: {
        type: String
    },
    dateofbirth: {
        type: String
    },
    email: {
        type: String
    },
    standard: {
        type: String
    },
    section: {
        type: String
    },
    phone: {
        type: String
    },
    profile: {
        type: String
    },
    entrydate: {
        type: Date,
        default: Date.now
    }
})

const Student = mongoose.model('Student', StudentsSchema);
export default Student;      
