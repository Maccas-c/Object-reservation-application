const express = require('express');
const router = express.Router();
const tariffController = require('../controllers/tariffController');
const { isAuth, isAdmin, rangeCourtsTariff } = require('./authMiddleware');

router.post('/api/admin/tariff', tariffController.tariffCreate);

router.get(
  '/api/admin/priceLists',
  isAdmin,
  rangeCourtsTariff,
  tariffController.tariffsGet,
);
router.get('/api/admin/priceLists/:id', isAdmin, tariffController.tariffGet);
router.put('/api/admin/priceLists/:id', isAdmin, tariffController.tariffUpdate);

// front
router.get('/api/priceLists', rangeCourtsTariff, tariffController.tariffsGet);

module.exports = router;
