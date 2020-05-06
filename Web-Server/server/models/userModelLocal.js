const mongoose = require('mongoose');

const userModelLocal = mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});

module.exports = mongoose.model('localUser', userModelLocal);