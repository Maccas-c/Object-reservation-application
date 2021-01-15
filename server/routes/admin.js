const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('./authMiddleware');
const { check } = require('express-validator');
const adminController = require('./../controllers/adminController');
const {
  rangeReservations,
  rangeUsers,
} = require('./../controllers/paginationAdmin');

router.get('/api/admin/users', rangeUsers, adminController.usersGet);
router.get('/api/admin/users/:userId', adminController.userGet);

router.get(
  '/api/admin/reservations',

  rangeReservations,
  adminController.reservationsGetByUserId,
);

router.put(
  '/api/admin/reservations/:id',

  adminController.reservationsEdit,
);
router.get(
  '/api/admin/reservations/:id',

  adminController.reservationGet,
);
router.delete(
  '/api/admin/reservations/:id',

  adminController.reservationsDelete,
);
router.post('/api/admin/reservations', adminController.reservationCreate);
module.exports = router;
