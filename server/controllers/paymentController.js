const { json } = require('express');
const request = require('request');
const userModel = require('../models/userModel');

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

module.exports.createPayments = function (req, res) {
  //let jsonBody1 = JSON.parse(req);
  console.log('lol' + req.body.price);
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
    const user = await userModel.findOneAndUpdate(
      { _id: req.body.order.products[0].name },
      {
        $set: {
          reservations: [],
        },
      },
      {
        useFindAndModify: false,
        new: true,
      },
    );
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
