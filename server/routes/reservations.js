const express = require('express');
const { isAuth, authRole} = require('./authMiddleware');
const router = express.Router();
const reservationController = require('./../controllers/reservationController');

router.get('/api/reservations', 
isAuth,
authRole(process.env.ROLE_ADMIN),
reservationController.reservationsGetAll);

router.post(
  '/api/reservation/create',
  //isAuth,
  reservationController.reservationCreate
);

router.delete(
  '/api/reservation/delete/:reservationId',
  isAuth,
  reservationController.reservationDelete
);

router.patch(
  '/api/reservation/update/:reservationId',
  isAuth,
  reservationController.reservationUpdate
);

router.get(
  '/api/reservation/:reservationId',
  //isAuth,
  reservationController.getReservation
);

router.get('/api/reservations/:userId', reservationController.reservationsGetByUserId);

module.exports = router;
