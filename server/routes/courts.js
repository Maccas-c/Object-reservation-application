const express = require('express');
const router = express.Router();
const courtController = require('./../controllers/courtController');
router.get('/api/court', function (req, res) {
  res.send('respond with a resource');
});

router.get('/api/admin/courts', courtController.courtsGet);

router.post('/api/admin/courts', courtController.courtsCreate);

router.delete('/api/admin/courts/:courtId', courtController.courtsDelete);

router.patch('/api/admin/courts/:courtId', courtController.courtsUpdate);

router.get('/api/admin/courts/:courtId', courtController.getCourt);

module.exports = router;
