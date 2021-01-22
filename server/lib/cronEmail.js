const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { getMaxListeners, get } = require('../config/database');
const reservationModel = require('../models/reservationModel');
const moment = require('moment');

const sendEmail = function (email) {
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
  cron.schedule('* * * * *', () => {
    console.log('scheduled');
    reservationModel
      .find({ email_sent: false })
      .populate('userId')
      .then(allReservation => {
        for (let result of allReservation) {
          var time = moment().toDate(); // This will return a copy of the Date that the moment uses

          time.setHours(0);
          time.setMinutes(0);
          time.setSeconds(0);
          time.setMilliseconds(0);
          let date = result.start;
          date.setHours(0, 0, 0, 0);
          console.log(date.getDay());
          if (today.getDate() + 1 == date.getDate()) {
            console.log('tutaj wysyłam se meila');
          }
          //console.log(Date.now() < date - 24 * 60 * 60 * 1000 * 7);
          // if (Date.now() < date - 24 * 60 * 60 * 1000 * 7) {
          //   console.log('send');
          //   sendEmail(result.userId.email);
          //   const getUser = reservationModel.findOne(
          //     {
          //       _id: result._id,
          //     },
          //     async function (err, reservation) {
          //       if (reservation) {
          //         await reservation.updateOne({
          //           $set: {
          //             email_sent: true,
          //           },
          //         });
          //       }
          //     },
          //   );
          // }
        }
      });
  });
};
