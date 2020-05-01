const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  login:{
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
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
  },
  longing2:{
    id: String,
    name: String,
    token: String,
    tokenSecret: String
  }
});



module.exports = mongoose.model('userModel', userModel);