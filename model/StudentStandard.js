import mongoose from 'mongoose'

// student Registration Schema
const StandardSchema = new mongoose.Schema({
    standard: {
        type: Number
    },
    description: {
        type: String
    },
    startyear: {
        type: Number
    },
    endyear: {
        type: Number
    },
})

const Standard = mongoose.model('Standard', StandardSchema);
export default Standard;