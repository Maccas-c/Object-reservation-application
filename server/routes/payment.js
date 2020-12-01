const express = require('express');
const router = express.Router();
const request = require('request');
const paymentController = require('./../controllers/paymentController');
var qs = require('querystring');
const { nextTick } = require('process');
let bodyObject = {};
router.post('/getToken', paymentController.getPayToken);

router.post('/createPayment', paymentController.createPayments);

router.post('/notify', paymentController.notify);

router.get('/getPaymentInfo/:orderId', paymentController.getOrderInfo);

module.exports = router;
