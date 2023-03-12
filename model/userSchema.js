const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    messages:[
        {
            name:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true
            },
            subject:{
                type: String,
                required: true
            },
            message:{
                type: String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// hashing our password before save() function
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        console.log('starting hashing');
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
        console.log(this.password);
        console.log(this.cpassword);
    }
    next();
});

// generating token 
userSchema.methods.generateAuthToken = async function () {
    try {

        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
}

// adding message
userSchema.methods.addMessage = async function ( name, email, subject, message ) {
    try {

        this.messages = this.messages.concat({ name:name, email:email, subject:subject, message:message });
        await this.save();
        return this.messages;

    } catch (error) {
        console.log(error);
    }
}

// creating model
const User = mongoose.model('USER', userSchema);

module.exports = User;