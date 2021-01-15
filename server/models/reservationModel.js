const { ObjectID, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reservationModel = mongoose.Schema({
  title: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  dayString: {
    type: String,
  },
  end: {
    type: Date,
  },
  courtId: {
    type: ObjectId,
    ref: 'courtModel',
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'userModel',
    required: true,
  },
});
module.exports = mongoose.model('reservationModel', reservationModel);
