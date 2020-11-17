const express = require('express');
const router = express.Router();
const request = require('request');
var qs = require('querystring');
let bodyObject = {};
router.post('/getToken', function (req, res) {
  request(
    {
      method: 'POST',
      url: 'https://secure.payu.com/pl/standard/user/oauth/authorize',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=145227&client_secret=12f071174cb7eb79d4aac5bc2f07563f',
    },
    function (error, response, body) {
      let jsonbody = JSON.parse(body);
      console.log(jsonbody);
    },
  );
});
router.post('/createPayment', function (req, res) {
  request(
    {
      method: 'POST',
      url: 'https://secure.payu.com/api/v2_1/orders/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd',
      },
      body:
        '{  "notifyUrl": "https://your.eshop.com/notify",  "customerIp": "127.0.0.1",  "merchantPosId": "145227",  "description": "RTV market",  "currencyCode": "PLN",  "totalAmount": "21000",  "products": [    {      "name": "Wireless mouse",      "unitPrice": "15000",      "quantity": "1"    },    {      "name": "HDMI cable",      "unitPrice": "6000",      "quantity": "1"    }  ]}',
    },
    function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    },
  );
});

router.post('/payments', function (req, res) {
  request(
    {
      method: 'GET',
      url: 'https://secure.payu.com/api/v2_1/paymethods/',
      headers: {
        Authorization: 'Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd',
      },
    },
    function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    },
  );
});

module.exports = router;
