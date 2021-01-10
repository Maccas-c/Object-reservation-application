const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { getMaxListeners, get } = require('../config/database');
const reservationModel = require('../models/reservationModel');

const sendEmail = function (email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const mailOptions = {
    from: `${process.env.EMAIL_ADDRESS}`,
    to: `${email}`,
    subject: 'Link To Reset Password',
    text: 'wiadomosć',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports.task = function () {
  cron.schedule('00 * * * * *', () => {
    console.log('scheduled');
    reservationModel
      .find({ email_sent: false })
      .populate('userId')
      .then(allReservation => {
        for (let result of allReservation) {
          console.log(result);
          let date = new Date(result.start_time);
          console.log(Date.now() < date - 24 * 60 * 60 * 1000 * 7);
          if (Date.now() < date - 24 * 60 * 60 * 1000 * 7) {
            console.log('send');
            sendEmail(result.userId.email);
            const getUser = reservationModel.findOne(
              {
                _id: result._id,
              },
              async function (err, reservation) {
                if (reservation) {
                  await reservation.updateOne({
                    $set: {
                      email_sent: true,
                    },
                  });
                }
              },
            );
          }
        }
      });
  });
};
