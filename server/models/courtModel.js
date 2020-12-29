const mongoose = require('mongoose');

const courtModel = mongoose.Schema({
  ids: {
    type: String,
    required: true,
  },
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
});
module.exports = mongoose.model('courtModel', courtModel);
