const express = require('express');
const crypto = require('crypto');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

module.exports.forgotPassword = async function (req, res) {
  if (req.body.email === '') {
    res.status(400).send('E-mail wymagany');
  }
  const token = crypto.randomBytes(20).toString('hex');
  await User.findOneAndUpdate(
    {
      email: req.body.email,
      isStudent: false,
    },
    {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000,
    },
    {
      // useNewUrlParser: true,
      //useFindAndModify: false
    },
    (err, user) => {
      if (err) {
        res.status(401).end('Błąd');
      }
      console.log(!user);
      console.log(user);
      if (!user) {
        return res.status(401).json('Użytkownik o podanym e-mail nie istnieje');
      }

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${user.email}`,
        subject: 'Link To Reset Password',
        text:
          'Otrzymujesz to, ponieważ Ty (lub ktoś inny) poprosiłeś o zresetowanie hasła do swojego konta.\n\n' +
          'Kliknij następujący link lub wklej go do przeglądarki, aby zakończyć proces w ciągu godziny od jego otrzymania:\n\n' +
          `http://localhost:3000/reset/${token}\n\n` +
          'Jeśli nie poprosiłeś o to, zignoruj ​​ten e-mail, a twoje hasło pozostanie niezmienione.\n',
      };

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          return res.status(422).send(err);
        } else {
          res
            .status(200)
            .json(
              'E-mail z instrukcjami został wysłany. Sprawdź skrzynkę odbiorczą',
            );
        }
      });
    },
  );
};
