const express = require('express');
const router = express.Router();
const tariffController = require('../controllers/tariffController');
const { isAuth, authRole, rangeCourtsTariff } = require('./authMiddleware');

router.post('/api/admin/tariff', tariffController.tariffCreate);

router.get(
  '/api/admin/priceLists',
  rangeCourtsTariff,
  tariffController.courtsGet,
);

module.exports = router;
