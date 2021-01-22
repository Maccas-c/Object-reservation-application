const mongoose = require('mongoose');
const { ObjectID, ObjectId } = require('mongodb');

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
  firstLogin: {
    type: Boolean,
    default: true,
  },
  sumPrice: {
    type: Number,
  },
  reservations: [
    {
      title: String,
      start: Date,
      dayString: String,
      end: Date,
      courtId: {
        type: ObjectId,
        ref: 'courtModel',
        required: true,
      },
      nameCourt: String,
      userId: String,
      isPaid: Boolean,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('userModel', userModel);
