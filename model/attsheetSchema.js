const mongoose = require('mongoose');

const attendenceSchema =  new mongoose.Schema({
    studentid:{
        type: String,
        required: true
    },
    class:{
        type :String,
        required:true
    }
    ,
    section:{
        type :String,
        required:true
    },

    attendences: [
        {
            date:{
                type: String,
                required: true
            },
            status:{
                type: Boolean,
                required: true
            }
        }
    ]
})



// creating model
const attendences = mongoose.model('ATTENDANCES', attendenceSchema);

module.exports = attendences;