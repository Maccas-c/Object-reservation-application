var express = require('express');
const reservationModel = require('../models/reservationModel');
const passport = require('passport');
const isAuth = require('./authMiddleware').isAuth;
var router = express.Router();


router.get('/reservation', isAuth, function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/reservations', isAuth, async (req, res, next) => {
  try {
    const reservations = await reservationModel.find();
    res.json(reservations);
  } catch (err) {
    res.json(err);
  }
});

router.post('/reservation/create', async (req, res) => {
  const reservation = new reservationModel({
    start_time: req.body.start_time,
    end_time: req.body.end_time, // ex. 2020-04-26T18:25:43.511Z
    userId: req.body.userId,
    courtId: req.body.courtId
  });
  try {
    const savedReservation = await reservation.save();
    res.json(savedReservation);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/reservation/delete/:reservationId', async (req, res) => {
  try {
    const deleteReservation = await reservationModel.remove({
      _id: req.params.reservationId
    });
    res.json(deleteReservation);
  } catch (err) {
    res.json(err);
  }
});

router.patch('/reservation/update/:reservationId', async (req, res) => {
  try {
    const updateReservation = await reservationModel.updateOne(
      { _id: req.params.reservationId },
      {
        $set: {
          start_time: req.body.start_time,
          end_time: req.body.end_time,
          userId: req.body.userId,
          courtId: req.body.courtId
        }
      }
    );
    res.json(updateUser);
  } catch (err) {
    res.json(err);
  }
});

router.get('/reservation/:reservationId', async (req, res) => {
  try {
    const getReservation = await reservationModel.findById(
      req.params.reservationId
    );
    res.json(getReservation);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
