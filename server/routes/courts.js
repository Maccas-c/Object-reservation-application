const express = require('express');
const router = express.Router();
const { isAuth } = require('./../controllers/middleware');
const courtController = require('./../controllers/courtController');
router.get('/api/court', function (req, res) {
  res.send('respond with a resource');
});

router.get('/api/courts', courtController.courtsGetFront);

//router.get('/api/courts', isAuth, rangeCourts, courtController.courtsGet);

module.exports = router;
