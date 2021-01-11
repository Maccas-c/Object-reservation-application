const crypto = require('crypto');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

module.exports.resetPassword = async function (req, res) {
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  }).then(user => {
    if (user == null) {
      res.status(403).send('E-mail lub hasło niepoprawne');
    } else {
      res.status(200).json('Hasło zostało zmienione');
    }
  });
};
