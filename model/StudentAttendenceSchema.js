import mongoose from 'mongoose'

const StudentAttendenceSchema =  new mongoose.Schema({
    year:{
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    students: [
        {
            studentid:{
                type: String,
                required: true
            },
            Name:{
                type: String,
                required: true
            },
            month: {
                
                    jan:{
                        attendences:[
                            {
                                date:{
                                    type:Number,
                                    required: true
                                },
                                status:{
                                    type:[Boolean|String]   ,
                                    required: true
                                }

                            }
                        ]
                    }            
               

            }
        }
    ]
})

const StudentAttendence = mongoose.model('StudentAttendence',StudentAttendenceSchema)
export default StudentAttendence;