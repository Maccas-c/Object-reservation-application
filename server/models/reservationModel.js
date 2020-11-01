const { ObjectID, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reservationModel = mongoose.Schema({
  start_time: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  courtid: {
    type: String,
    required: true
  },
  userid: {
    type: ObjectId,
    required: true
  }
});
module.exports = mongoose.model('reservationModel', reservationModel);
