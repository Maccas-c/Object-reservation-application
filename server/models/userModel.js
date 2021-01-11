const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  email: String,
  hash: String,
  salt: String,
  idUsos: String, //usos
  student_status: String, //usos
  student_number: String, //usos
  name: String,
  surname: String,
  age: Number,
  phone_number: String,
  sex: String,
  role: {
    type: String,
    default: 'user',
  },
  adress_street: String,
  adress_city: String,
  adress_postalCode: String,
  isStudent: {
    type: Boolean,
    default: false,
  }, //usos
  isActive: {
    type: Boolean,
    default: true,
  },
  nip: String,
  createDate: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model('userModel', userModel);
