const express = require('express');
const router = express.Router();
const request = require('request');
const paymentController = require("./../controllers/paymentController");
var qs = require('querystring');
const { nextTick } = require('process');
let bodyObject = {};
router.post('/getToken', paymentController.getPayToken);

router.post('/createPayment/:bearer', paymentController.createPayments);

router.post('/odp', paymentController.notify)

module.exports = router;
