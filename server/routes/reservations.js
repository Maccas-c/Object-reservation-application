const express = require('express');
const { isAuth } = require('./../controllers/middleware');

const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/api/reservations', isAuth, reservationController.reservationsGet);

router.post(
  '/api/reservations/getPrice',
  isAuth,
  reservationController.getPriceFront,
);

router.post(
  '/api/reservation/create',
  isAuth,
  reservationController.reservationAddBasket2,
);
router.post(
  '/api/reservation/addToBasket',
  isAuth,
  reservationController.reservationAddBasket,
);

router.post(
  '/api/reservation/create/groups',
  isAuth,
  reservationController.reservationCreateConstant,
);

router.get(
  '/api/reservation/:reservationId',
  isAuth,
  reservationController.getReservation,
);

router.get(
  '/api/reservations/:userId',
  isAuth,
  reservationController.reservationsGetByUserId,
);

router.post(
  '/api/reservationsDate',
  isAuth,
  reservationController.reservationsGetByDate,
);

module.exports = router;
