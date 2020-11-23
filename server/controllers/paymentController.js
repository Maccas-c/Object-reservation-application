const request = require('request');

module.exports.getPayToken = function(req, res){
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
       let jsonBody = JSON.parse(body);
      // console.log(jsonbody);
      // let a = 'Bearer ' + jsonbody.access_token;
      // console.log(a);
      res.status(200).json(jsonBody.access_token)
  }
  );
}

module.exports.createPayments = function(req, res){
  request(
    {
      method: 'POST',
      url: 'https://secure.snd.payu.com/api/v2_1/orders/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.params.bearer,
      },
      body:
        '{  "notifyUrl": "http://46.186.40.98:3001/notify",  "customerIp": "127.0.0.1",  "merchantPosId": "399358",  "description": "RTV market",  "currencyCode": "PLN",  "totalAmount": "21000",  "products": [    {      "name": "Wireless mouse",      "unitPrice": "15000",      "quantity": "1"    },    {      "name": "HDMI cable",      "unitPrice": "6000",      "quantity": "1"    }  ]}',
    },
    function (error, response, body) {
      //console.log('Status:', response.statusCode);
      //console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
      res.status(200).json(body)
     },
  );
}

module.exports.notify = function (req, res) {
  console.log(req.body)
  res.status(200)
};

module.exports.getOrderInfo = function(req, res){
  request({
    method: 'GET',
    url: 'https://secure.snd.payu.com/api/v2_1/orders/' + req.params.orderId,
    headers: {
      'Authorization': 'Bearer ' + req.params.bearer ,
    }}, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.status(200).send(body)
  });
}

module.exports.getCos = function(req, res)
{
  res.send("lol");
}