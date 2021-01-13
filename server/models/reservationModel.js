const { ObjectID, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reservationModel = mongoose.Schema({
  start_time: {
    type: Date,
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
