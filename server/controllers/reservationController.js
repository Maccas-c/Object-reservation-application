const { Double } = require('mongodb');
const { db } = require('../models/reservationModel');
const reservationModel = require('../models/reservationModel');
const userModel = require('./../models/userModel');
module.exports.reservationsGet = async function (req, res) {
  // 2020-05-12
  const date = req.query.time;
  try {
    const reservations = await reservationModel.find({
      start_time: date,
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.reservationsGetAll = async function (req, res) {
  try {
    const reservations = await reservationModel.find().populate('userid');
    res.status(200).json(reservations);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

module.exports.reservationCreate = async function (req, res) {
  const isExist = reservationModel.findOne(
    {
      start_time: req.body.start_time,
      hour: req.body.hour,
      courtId: req.body.courtId,
      userId: req.body.userId,
    },
    async function (err, obj) {
      if (err) return res.status(404).json(err);
      if (obj) return res.status(422).json('The hour is taken');
      else {
        const reservation = new reservationModel({
          start_time: req.body.start_time,
          hour: req.body.hour,
          courtId: req.body.courtId,
          userId: req.body.userId,
        });
        try {
          const savedReservation = await reservation.save();
          res.status(201).json(savedReservation);
        } catch (err) {
          res.status(400).json(err);
        }
      }
    },
  );
};

module.exports.reservationCreateConstant = async function (req, res) {
  const table = req.body;
  table.forEach(element => {
    delete element['uuid'];
  });
  reservationModel
    .insertMany(table)
    .then(function () {
      res.status(201).end();
    })
    .catch(function (error) {
      res.status(400).json(error);
    });
};

module.exports.reservationDelete = async function (req, res) {
  try {
    const deletedReservation = await reservationModel.remove({
      _id: req.params.reservationId,
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
        _id: req.params.reservationId,
      },
      {
        $set: {
          start_time: req.body.start_time,
          end_time: req.body.end_time,
          userid: req.body.userId,
          courtId: req.body.courtId,
        },
      },
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.getReservation = async function (req, res) {
  try {
    const getReservation = await reservationModel.findById(
      req.params.reservationId,
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
      userid: userId,
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(404).json(err);
  }
};
