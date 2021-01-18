const express = require('express');
const router = express.Router();
const tariffController = require('../controllers/tariffController');
const { isAuth } = require('./../controllers/middleware');

// front
router.get('/api/priceLists', tariffController.tariffsGet);

module.exports = router;
