const express = require('express');
const router = express.Router();
const request = require('request');
var qs = require('querystring');
let bodyObject = {};
router.post('/getToken', function (req, res) {
  request(
    {
      method: 'POST',
      url: 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:
        'grant_type=client_credentials&client_id=399358&client_secret=23c6ab603340ce6c2d588a76989197b0',
    },
    function (error, response, body) {
      let jsonbody = JSON.parse(body);
      console.log(jsonbody);
      let a = 'Bearer ' + jsonbody.access_token;
      console.log(a);
      request(
        {
          method: 'POST',
          url: 'https://secure.snd.payu.com/api/v2_1/orders/',
          headers: {
            'Content-Type': 'application/json',
            Authorization: a,
          },
          body:
            '{  "notifyUrl": "https://localhost:3001/notify",  "customerIp": "127.0.0.1",  "merchantPosId": "399358",  "description": "RTV market",  "currencyCode": "PLN",  "totalAmount": "21000",  "products": [    {      "name": "Wireless mouse",      "unitPrice": "15000",      "quantity": "1"    },    {      "name": "HDMI cable",      "unitPrice": "6000",      "quantity": "1"    }  ]}',
        },
        function (error2, response2, body2) {
          console.log('Status:', response2.statusCode);
          console.log('Headers:', JSON.stringify(response2.headers));
          console.log('Response:', body2);
        },
      );
    },
  );
});
router.post('/createPayment', function (req, res) {
  request(
    {
      method: 'POST',
      url: 'https://secure.snd.payu.com/api/v2_1/orders/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd',
      },
      body:
        '{  "notifyUrl": "https://localhost:3001/notify",  "customerIp": "127.0.0.1",  "merchantPosId": "399358",  "description": "RTV market",  "currencyCode": "PLN",  "totalAmount": "21000",  "products": [    {      "name": "Wireless mouse",      "unitPrice": "15000",      "quantity": "1"    },    {      "name": "HDMI cable",      "unitPrice": "6000",      "quantity": "1"    }  ]}',
    },
    function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    },
  );
});

router.get('/payments', function (req, res) {
  request(
    {
      method: 'GET',
      url: 'https://secure.snd.payu.com/api/v2_1/paymethods/',
      headers: {
        Authorization: 'Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd',
      },
    },
    function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      let jsonbody = JSON.parse(body);
      console.log(jsonbody);
    },
  );
});

router.get('/notify', function (req, res) {
  request(
    {
      method: 'POST',
      url: 'https://localhost:3001/notify',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    function (error, response, body) {
      let jsonbody = JSON.parse(body);
      console.log(jsonbody);
    },
  );
});

module.exports = router;
