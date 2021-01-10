const { ObjectID, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reservationModel = mongoose.Schema({
  start_time: {
    type: String,
    required: true,
  },
  email_sent: {
    type: Boolean,
    default: false,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  courtId: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'userModel',
    required: true,
  },
});
module.exports = mongoose.model('reservationModel', reservationModel);
