const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('./../controllers/middleware');
const { check } = require('express-validator');
const adminController = require('./../controllers/adminController');
const {
  rangeReservations,
  rangeUsers,
  rangeCourts,
  rangeCourtsTariff,
} = require('./../controllers/paginationAdmin');

// Użytkownicy
router.get('/api/admin/users', rangeUsers, adminController.usersGet);
router.get('/api/admin/users/:userId', adminController.userGet);
router.delete('/api/admin/users/:userId', adminController.userDelete);
// ---------------------------------------------------------

// Rezerwacje
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
// ---------------------------------------------------------

// Boiska
router.get('/api/admin/courts', rangeCourts, adminController.courtsGet);

router.post('/api/admin/courts', adminController.courtsCreate);

router.delete('/api/admin/courts/:courtId', adminController.courtsDelete);

router.patch('/api/admin/courts/:courtId', adminController.courtsUpdate);

router.get('/api/admin/courts/:courtId', adminController.getCourt);

router.post('/api/admin/tariff', adminController.tariffCreate);
// ---------------------------------------------------------

// Cennik
router.get(
  '/api/admin/priceLists',
  rangeCourtsTariff,
  adminController.tariffsGet,
);
router.get(
  '/api/admin/priceLists/:id',
  rangeCourtsTariff,
  adminController.tariffGet,
);
router.put('/api/admin/priceLists/:id', adminController.tariffUpdate);
// ---------------------------------------------------------
module.exports = router;
