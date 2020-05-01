const mongoose = require('mongoose');

const userModel1 = mongoose.Schema({
  name: {
    id:String,
    name: String,
    token: String,
    tokenSecret: String,

  }
});

module.exports = mongoose.model('name', userModel1);