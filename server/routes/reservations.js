const express = require('express');
const { isAuth } = require('./authMiddleware');

const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/api/reservations', reservationController.reservationsGet);

router.post('/api/reservations/getPrice', reservationController.getPriceFront);

router.get(
  '/api/allReservations',
  isAuth,
  reservationController.reservationsGetAll,
);

router.post(
  '/api/reservation/addToBasket',
  // isAuth,
  reservationController.reservationCreate,
);

router.post(
  '/api/reservation/create/groups',
  reservationController.reservationCreateConstant,
);

router.delete(
  '/api/reservation/delete/:reservationId',
  isAuth,
  reservationController.reservationDelete,
);

router.patch(
  '/api/reservation/update/:reservationId',
  isAuth,
  reservationController.reservationUpdate,
);

router.get(
  '/api/reservation/:reservationId',
  // isAuth,
  reservationController.getReservation,
);

router.get(
  '/api/reservations/:userId',
  reservationController.reservationsGetByUserId,
);

router.post(
  '/api/reservationsDate',
  reservationController.reservationsGetByDate,
);

module.exports = router;
