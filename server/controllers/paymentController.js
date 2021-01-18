const { json } = require('express');
const request = require('request');
const userModel = require('../models/userModel');
const reservationModel = require('../models/reservationModel');
const moment = require('moment');

module.exports.getPayToken = async function (req, res) {
  request(
    {
      method: 'POST',
      url: 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=' +
        process.env.PAYU_CLIENT_ID +
        '&client_secret=' +
        process.env.PAYU_CLIENT_SECRET,
    },
    function (error, response, body) {
      try {
        let jsonBody = JSON.parse(body);
        res.status(response.statusCode).send(jsonBody.access_token);
      } catch {
        if (error) return res.status(404).json(error);
      }
    },
  );
};

module.exports.returnListToSave = async function (req, res, next) {
  const reservations = req.body.reservations;
  let saveToBase = [];
  const user = userModel.findOne({ _id: req.body.userId });
  for (const item of reservations) {
    console.log('middleware1 - tu powinienem byc 1');
    let start = moment(item.start);

    let titleDate = start.format('HH:mm');

    let day = start.format('DD');
    let year = start.format('YYYY');
    let month = start.format('MM');
    const dayString = year + '-' + month + '-' + day;
    console.log('jestem przed findone');
    let reserv = await reservationModel.findOne(
      { start: start },
      async function (err, obj) {
        console.log('jestem we funkcji');
        if (err) {
          userModel.update(
            {
              _id: req.body.userId,
            },
            {
              reservations: [],
            },
          );

          return res.status(404).json(err);
        }
        if (obj) {
          userModel.update(
            {
              _id: req.body.userId,
            },
            {
              reservations: [],
            },
          );

          return res.status(422).json('Godzina zajęta');
        } else {
          console.log('dodaje do saveToBase');
          saveToBase.push({
            title: titleDate,
            start: moment(req.body.reservations.start).add(1, 'hours'),
            dayString: dayString,
            end: moment(req.body.start)
              .add(1, 'hours')
              .add(req.body.reservations.duration, 'm'),
            courtId: item.courtId,
            userId: req.body.userId,
          });
        }
        console.log(saveToBase);
      },
    );
  }
  console.log('middleware1 - tu powinienem byc 2');
  console.log(saveToBase);
  res.locals.saveToBase = saveToBase;
  next();
};

module.exports.saveToBase = async function (req, res, next) {
  console.log('middleware2 - zapis do bazy');
  await reservationModel.insertMany(res.locals.saveToBase);
  next();
};

module.exports.createPayments = async function (req, res) {
  request(
    {
      method: 'POST',
      url: 'https://secure.snd.payu.com/api/v2_1/orders/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.headers.bearer,
      },
      body: JSON.stringify({
        customerIp: '150.254.78.206',
        notifyUrl: 'https://devcourt.projektstudencki.pl/api/notify',
        merchantPosId: process.env.PAYU_CLIENT_ID,
        description: 'DEV',
        currencyCode: 'PLN',
        totalAmount: req.body.price,
        continueUrl: 'https://devcourt.projektstudencki.pl/',
        buyer: {
          email: req.body.email,
          phone: '+48 ' + req.body.phone,
          firstName: req.body.name,
          lastName: req.body.surname,
          language: 'pl',
          delivery: {
            postalCode: req.body.adress_postalCode,
            city: req.body.adress_city,
            street: req.body.adress_street,
            countryCode: 'PL',
          },
        },
        products: [
          {
            name: req.body._id,
            unitPrice: req.body.price,
            quantity: '1',
          },
        ],
      }),
    },
    function (error, response, body) {
      console.log(error);
      console.log('respone' + response);
      console.log('body', body);
      let jsonBody = JSON.parse(body);
      if (jsonBody.status.statusCode == 'SUCCESS') {
        return res.status(200).send(body);
      } else if (jsonBody.status.statusCode == 'UNAUTHORIZED') {
        return res.status(401).send(jsonBody.status.codeLiteral);
      } else {
        return res.status(500).send('Problem with PayU server');
      }
      res.end();
    },
  );
};

module.exports.notify = async function (req, res) {
  console.log(req.body.order);
  if (req.body.order.status == 'COMPLETED') {
    const user = await userModel.find({ _id: req.body.order.products[0].name });

    const reservation = await reservationModel.find({
      orderId: req.body.order.products[0].orderId,
    });
    user.reservations.forEach(item => console.log(item));
    console.log('user', user);
    res.status(200);
  }
};

module.exports.getOrderInfo = function (req, res) {
  request(
    {
      method: 'GET',
      url: 'https://secure.snd.payu.com/api/v2_1/orders/' + req.params.orderId,
      headers: {
        Authorization: 'Bearer ' + req.headers.bearer,
      },
    },
    function (error, response, body) {
      let jsonBody = JSON.parse(body);
      res.status(200).send(jsonBody.status.statusCode);
    },
  );
};
