const crypto = require('crypto');
const User = require('../models/userModel');
const genPassword = require('../lib/password').genPassword;
const nodemailer = require('nodemailer');

module.exports.updatePasswordViaEmail_Patch = async function (req, res) {
  const isExist = User.findOne(
    {
      email: req.body.email,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
    async function (err, user) {
      if (err) return res.status(404).json(err);
      if (user == null)
        return res.status(403).json('E-mail lub hasło niepoprawne');
      else if (user != null) {
        try {
          const saltHash = await genPassword(req.body.password);
          const salt = saltHash.salt;
          const hash = saltHash.hash;
          await user.update({
            $set: {
              hash: hash,
              salt: salt,
              resetPasswordToken: null,
              resetPasswordExpires: null,
            },
          });
          user.save();
          return res.status(200).json('Hasło zostało zmienione');
        } catch (err) {
          res.status(404).json(err);
        }
      } else {
        res.status(401).json('Użytkownik nie istnieje');
      }
    },
  );
};
