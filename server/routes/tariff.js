const express = require('express');
const router = express.Router();
const tariffController = require('../controllers/tariffController');

router.post('/api/tariff', tariffController.tariffCreate);

module.exports = router;
