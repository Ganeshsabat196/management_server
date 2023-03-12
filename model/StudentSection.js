import mongoose from 'mongoose'

// student Registration Schema
const SectionSchema = new mongoose.Schema({
    standard: {
        type: Number
    },
    startyear: {
        type: Number
    },
    endyear: {
        type: Number
    },
    batches: [
        {
            standard: {
                type: Number
            },
            startyear: {
                type: Number
            },
            endyear: {
                type: Number
            },
            section: {
                type: String
            },
            description: {
                type: String
            },
        }
    ],
})

const Section = mongoose.model('Section', SectionSchema);
export default Section;