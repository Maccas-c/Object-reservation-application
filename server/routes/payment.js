const express = require('express');
const router = express.Router();
const request = require('request');
const { isAuth } = require('./../controllers/middleware');
const paymentController = require('./../controllers/paymentController');
const { getPrice } = require('../controllers/reservationController');

var qs = require('querystring');
const { nextTick } = require('process');
let bodyObject = {};
router.post('/api/getToken', isAuth, paymentController.getPayToken);

router.post(
  '/api/createPayment',
  isAuth,
  paymentController.returnListToSave,
  paymentController.saveToBase,
  paymentController.createPayments,
);
router.post(
  '/api/reservationsDelete/:reservationId',
  isAuth,
  paymentController.removeReservation,
);

router.post('/api/notifyy', paymentController.notify);

router.get('/getPaymentInfo/:orderId', isAuth, paymentController.getOrderInfo);

module.exports = router;
