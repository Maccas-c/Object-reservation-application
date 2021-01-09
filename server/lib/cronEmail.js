const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../config/database');

const sendEmail = function () {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const mailOptions = {
    from: `${process.env.EMAIL_ADDRESS}`,
    to: `${'michalkubiak37@gmail.com'}`,
    subject: 'Link To Reset Password',
    text:
      'Otrzymujesz to, ponieważ Ty (lub ktoś inny) poprosiłeś o zresetowanie hasła do swojego konta.\n\n' +
      'Kliknij następujący link lub wklej go do przeglądarki, aby zakończyć proces w ciągu godziny od jego otrzymania:\n\n' +
      `http://localhost:3000/reset/` +
      'Jeśli nie poprosiłeś o to, zignoruj ​​ten e-mail, a twoje hasło pozostanie niezmienione.\n',
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
    console.log('wysłano');
    //sendEmail();
  });
};
