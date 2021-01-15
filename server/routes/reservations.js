const express = require('express');
const { isAuth } = require('./authMiddleware');

const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/api/reservations', reservationController.reservationsGet);

router.post('/api/reservations/getPrice', reservationController.getPriceFront);

router.post(
  '/api/reservation/create',
  // isAuth,
  reservationController.reservationAddBasket2,
);

router.post(
  '/api/reservation/addToBasket',
  // isAuth,
  reservationController.reservationAddBasket,
);
router.post(
  '/api/reservation/create/groups',
  reservationController.reservationCreateConstant,
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
