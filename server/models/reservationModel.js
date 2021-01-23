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
  vat: {
    type: Boolean,
    default: false,
  },
  isServedVat: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  orderId: {
    type: String,
  },
  email_sent: {
    type: Boolean,
    default: false,
    required: true,
  },
  price: {
    type: Number,
  },
  referId: String,
});

module.exports = mongoose.model('reservationModel', reservationModel);
