const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('./authMiddleware');
const { check } = require('express-validator');
const adminController = require('./../controllers/adminController');
const {
  rangeReservations,
  rangeUsers,
} = require('./../controllers/paginationAdmin');

router.get('/api/admin/users', isAdmin, rangeUsers, adminController.usersGet);
router.get('/api/admin/users/:userId', isAdmin, adminController.userGet);

router.get(
  '/api/admin/reservations',
  isAdmin,
  rangeReservations,
  adminController.reservationsGetByUserId,
);

router.post('/api/admin/reservations', isAdmin, reservationCreate);

router.put(
  '/api/admin/reservations/:id',
  isAdmin,
  adminController.reservationsEdit,
);
router.get(
  '/api/admin/reservations/:id',
  isAdmin,
  adminController.reservationGet,
);
router.delete(
  '/api/admin/reservations/:id',
  isAdmin,
  adminController.reservationsDelete,
);
router.post('/api/admin/reservations', adminController.reservationCreate);
module.exports = router;
