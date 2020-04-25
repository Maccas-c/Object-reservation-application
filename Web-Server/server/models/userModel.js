const mongoose = require('mongoose');


const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required:true 
    },
    password:{
        type: String,
        required: true
    },
    salt: String,
    age: Number,
    phone_number: String,
    isActive: {
        type: Boolean,
        default: true
    },
    isStudent: Boolean
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
})

module.exports = mongoose.model('userModel', userModel);