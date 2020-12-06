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
});
module.exports = mongoose.model('courtModel', courtModel);
