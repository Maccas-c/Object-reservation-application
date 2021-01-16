const { json } = require('express');
const request = require('request');

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
        customerIp: '127.0.0.1',
        merchantPosId: process.env.PAYU_CLIENT_ID,
        description: 'DEV',
        currencyCode: 'PLN',
        totalAmount: req.body.price,
        continueUrl: 'http://localhost:3000/',
        buyer: {
          customerId: req.user._id,
          email: req.user.email,
          firstName: req.user.name,
          phone: '+48 ' + req.user.phone_number,
          lastName: req.user.surname,
          language: 'pl',
        },
        buyerDelivery: {
          street: req.user.adress_street,
          postalCode: req.user.adress_postalCode,
          city: req.user.adress_city,
          countryCode: 'PL',
        },
        products: [
          {
            name: req.body.nameOfReservation,
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

module.exports.notify = function (req, res) {
  console.log(req.body);
  res.status(200);
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
