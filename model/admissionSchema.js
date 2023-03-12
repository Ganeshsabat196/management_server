const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// Admission Schema
const admissionSchema =  new mongoose.Schema({
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
admissionSchema.plugin(autoIncrement.plugin, 'Admission');

const Admission = mongoose.model('Admission',admissionSchema);
module.exports = Admission;