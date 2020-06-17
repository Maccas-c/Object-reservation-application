const mongoose = require("mongoose");

const reservationModel = mongoose.Schema({
  start_time: {
    type: String,
  },
  hour: {
    type: String,
  },
  end_time: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  courtId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("reservationModel", reservationModel);
