const mongoose = require('mongoose');
const { ObjectID, ObjectId } = require('mongodb');

const courtModel = mongoose.Schema({
  ids: { type: String, required: true },
  nameCourt: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: [
    {
      nameOfDay: String,
      value: Boolean,
    },
  ],
  sessionTime: {
    type: String,
  },
  tariffId: {
    type: ObjectId,
    ref: 'tariffModel',
    required: true,
  },
});
module.exports = mongoose.model('courtModel', courtModel);
