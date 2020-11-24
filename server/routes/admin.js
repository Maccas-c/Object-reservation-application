const express = require('express');
const router = express.Router();
const { isAuth, authRole, range } = require('./authMiddleware');
const { check } = require('express-validator');
const adminController = require('./../controllers/adminController');
router.get(
  '/api/admin',
  isAuth,
  authRole(process.env.ROLE_ADMIN),
  (req, res) => {
    res.send('admin');
  },
);

router.get(
  '/api/admin/users',
  range,
  // isAuth,
  // authRole(process.env.ROLE_ADMIN),
  adminController.usersGet,
);
router.get('/api/admin/users/:userId', adminController.userGet);
router.get(
  '/api/admin/reservations',
  range,
  adminController.reservationsGetByUserId,
);
router.delete(
  '/api/admin/reservations/:id',
  adminController.reservationsDelete,
);
module.exports = router;
