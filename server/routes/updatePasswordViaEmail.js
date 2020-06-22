const express = require('express');
const crypto = require('crypto');
const User = require('../models/userModel');
const genPassword = require('../lib/password').genPassword;
const nodemailer = require('nodemailer');

require('dotenv').config();

const router = express.Router();

router.patch('/api/updatePasswordViaEmail', async (req, res) => {
  const isExist = User.findOne(
    {
      email: req.body.email,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    },
    async function (err, user) {
      console.log(user);
      if (err) return res.status(404).json(err);
      if (user == null)
        return res
          .status(403)
          .json('password reset link is invalid or has expired');
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
              resetPasswordExpires: null
            }
          });
          user.save();
          res.status(200).json(user);
        } catch (err) {
          res.status(404).json(err);
        }
      } else {
        console.error('no user exists in db to update');
        res.status(401).json('no user exists in db to update');
      }
    }
  );
});

module.exports = router;
