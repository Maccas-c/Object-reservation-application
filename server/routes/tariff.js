const express = require('express');
const router = express.Router();
const tariffController = require('../controllers/tariffController');

router.post('/api/admin/tariff', tariffController.tariffCreate);

router.get('/api/admin/priceLists', tariffController.courtsGet);

module.exports = router;
