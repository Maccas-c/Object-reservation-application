const express = require('express');
const router = express.Router();
const {
  isAuth,
  authRole,
  rangeUsers,
  rangeReservations,
} = require('./authMiddleware');
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
  rangeUsers,
  // isAuth,
  // authRole(process.env.ROLE_ADMIN),
  adminController.usersGet,
);
router.get(
  '/api/admin/reservations',
  rangeReservations,
  adminController.reservationsGetByUserId,
);
router.get('/api/admin/users/:userId', adminController.userGet);

router.delete(
  '/api/admin/reservations/:id',
  adminController.reservationsDelete,
);
module.exports = router;
