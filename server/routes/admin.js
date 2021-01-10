const express = require('express');
const router = express.Router();
const { isAuth, authRole } = require('./authMiddleware');
const { check } = require('express-validator');
const adminController = require('./../controllers/adminController');
const {
  rangeReservations,
  rangeUsers,
} = require('./../controllers/paginationAdmin');
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
router.get('/api/admin/users/:userId', adminController.userGet);

router.get(
  '/api/admin/reservations',
  rangeReservations,
  adminController.reservationsGetByUserId,
);
router.delete(
  '/api/admin/reservations/:id',
  adminController.reservationsDelete,
);
router.post('/api/admin/reservations', adminController.reservationCreate);
module.exports = router;
