const express = require('express');
const router = express.Router();
const { isAuth, isAdmin, rangeCourts } = require('./authMiddleware');
const courtController = require('./../controllers/courtController');
router.get('/api/court', function (req, res) {
  res.send('respond with a resource');
});

router.get(
  '/api/admin/courts',
  isAdmin,
  rangeCourts,
  courtController.courtsGet,
);

router.get('/api/courts', isAuth, courtController.courtsGet);

router.post('/api/admin/courts', isAdmin, courtController.courtsCreate);

router.delete(
  '/api/admin/courts/:courtId',
  isAdmin,
  courtController.courtsDelete,
);

router.patch(
  '/api/admin/courts/:courtId',
  isAdmin,
  courtController.courtsUpdate,
);

router.get('/api/admin/courts/:courtId', isAdmin, courtController.getCourt);

module.exports = router;
