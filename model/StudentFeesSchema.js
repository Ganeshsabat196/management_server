import mongoose from 'mongoose'

// student Registration Schema
const StudentFeesSchema = new mongoose.Schema({
    student_id: {
        type: String
    },
    student_name: {
        type: String
    },

    fees: [
        {
            fees_amount: {
                type: Number
            },
            fees_type: {
                type: String
            },
            payment_date: {
                type: String
            },
            entrydate: {
                type: Date,
                default: Date.now
            }
        }
    ],
})

const StudentFees = mongoose.model('StudentFees', StudentFeesSchema);
export default StudentFees;