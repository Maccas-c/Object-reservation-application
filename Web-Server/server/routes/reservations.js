var express = require("express");
const reservationModel = require("../models/reservationModel");
const passport = require("passport");
const isAuth = require("./authMiddleware").isAuth;
var router = express.Router();

router.get("/reservation", isAuth, function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/reservations", isAuth, async (req, res, next) => {
  try {
    const reservations = await reservationModel.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post(
  "/reservation/create/:userId/:courtId",
  isAuth,
  async (req, res) => {
    const reservation = new reservationModel({
      start_time: req.body.start_time,
      end_time: req.body.end_time, // ex. 2020-04-26T18:25:43.511Z
      userId: req.params.userId,
      courtId: req.params.courtId,
    });
    try {
      const savedReservation = await reservation.save();
      res.status(201).json(savedReservation);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.delete("/reservation/delete/:reservationId", async (req, res) => {
  try {
    const deletedReservation = await reservationModel.remove({
      _id: req.params.reservationId,
    });
    res.status(200).json(deletedReservation);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.patch("/reservation/update/:reservationId", async (req, res) => {
  try {
    const updatedReservation = await reservationModel.updateOne(
      { _id: req.params.reservationId },
      {
        $set: {
          start_time: req.body.start_time,
          end_time: req.body.end_time,
          userId: req.body.userId,
          courtId: req.body.courtId,
        },
      }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/reservation/:reservationId", async (req, res) => {
  try {
    const getReservation = await reservationModel.findById(
      req.params.reservationId
    );
    res.status(200).json(getReservation);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
