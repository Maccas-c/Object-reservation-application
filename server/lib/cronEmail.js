const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { getMaxListeners, get } = require('../config/database');
const reservationModel = require('../models/reservationModel');
const moment = require('moment');

const sendEmail = function (email, godzina) {
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
    to: `${email}`,
    subject: 'Przypomnienie o Twojej rezerwacji w serwisie DevCourt',
    text: `Uprzejmie informujemy, że jutro o godzinie ${godzina} zaczyna się Twoja rezerwacja oraz dziękujemy za skorzystanie z naszych usług `,
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
  cron.schedule('0 12 * * *', () => {
    console.log('scheduled');
    reservationModel
      .find({ email_sent: false })
      .populate('userId')
      .then(allReservation => {
        for (let result of allReservation) {
          let startTime = moment.utc();
          let date = moment.utc(result.start).subtract(1, 'day');

          if (startTime.isSame(date, 'day')) {
            sendEmail(result.userId.email, result.title);
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
