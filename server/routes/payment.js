const express = require('express');
const router = express.Router();
const request = require('request');
const paymentController = require('./../controllers/paymentController');
const { getPrice } = require('../controllers/reservationController');

var qs = require('querystring');
const { nextTick } = require('process');
let bodyObject = {};
router.post('/api/getToken', paymentController.getPayToken);

router.post('/api/createPayment', paymentController.createPayments);

router.post('/api/notify', paymentController.notify);

router.get('/getPaymentInfo/:orderId', paymentController.getOrderInfo);

module.exports = router;
