const { ObjectID, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const courtsTariff = mongoose.Schema({
  ids: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  classes_and_sports_training: {
    type: String,
    required: true,
  },
  tournament_matches: {
    type: String,
    required: true,
  },
  university_club: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('courtsTariff', courtsTariff);
