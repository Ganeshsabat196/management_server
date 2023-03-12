import mongoose from 'mongoose'

const StudentTestSchema =  new mongoose.Schema({
    student_id: {
        type: String
    },
    student_name: {
        type: String
    },
    student_standard: {
        type: String
    },
    student_section: {
        type: String
    },
    tests: [
        {
            test_subject: {
                type: String
            },
            test_chapter: {
                type: String
            },
            test_date: {
                type: String
            },
            test_marks_obtained: {
                type: Number
            },
            test_marks: {
                type: Number
            },
            entrydate: {
                type: Date,
                default: Date.now
            }
        }
    ],
})

const StudentTest = mongoose.model('StudentTest',StudentTestSchema)
export default StudentTest;