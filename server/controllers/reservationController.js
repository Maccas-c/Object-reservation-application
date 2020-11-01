const reservationModel = require("../models/reservationModel");

module.exports.reservationsGet = async function (req, res) {
  // 2020-05-12
  const date = req.query.time;
  try {
    const reservations = await reservationModel.find({
      start_time: date
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.reservationCreate = async function (req, res) {
  const isExist = reservationModel.findOne(
    {
      start_time: req.body.start_time,
      hour: req.body.hour,
      courtid: req.body.courtid
    },
    async function (err, obj) {
      if (err) return res.status(404).json(err);
      if (obj) return res.status(422).json("The hour is taken");
      else {
        const reservation = new reservationModel({
          start_time: req.body.start_time,
          hour: req.body.hour,
          courtid: req.body.courtid
        });
        try {
          const savedReservation = await reservation.save();
          res.status(201).json(savedReservation);
        } catch (err) {
          res.status(400).json(err);
        }
      }
    }
  );
};

module.exports.reservationDelete = async function (req, res) {
  try {
    const deletedReservation = await reservationModel.remove({
      _id: req.params.reservationId
    });
    res.status(200).json(deletedReservation);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.reservationUpdate = async function (req, res) {
  try {
    const updatedReservation = await reservationModel.updateOne(
      {
        _id: req.params.reservationId
      },
      {
        $set: {
          start_time: req.body.start_time,
          end_time: req.body.end_time,
          userId: req.body.userId,
          courtId: req.body.courtId
        }
      }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.getReservation = async function (req, res) {
  console.log("lol");
  try {
    const getReservation = await reservationModel.findById(
      req.params.reservationId
    );
    res.status(200).json(getReservation);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.reservationsGetByUserId = async function (req, res) {
  const userId = req.params.userId;
  try {
    const reservations = await reservationModel.find({
      userid: userId
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(404).json(err);
  }
};
