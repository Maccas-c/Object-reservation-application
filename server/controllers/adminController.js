const { ObjectId } = require('mongodb');
const userModel = require('../models/userModel');
const reservationModel = require('../models/reservationModel');
const { validationResult } = require('express-validator');
const queryString = require('query-string');

module.exports.usersGet = async function (req, res) {
  const response = res.locals.allUsers;
  const rangeFilters = res.locals.rangeFilters;
  let dataReservation = [];

  for (i = rangeFilters[0]; i < rangeFilters[1]; i++) {
    if (response[i] == undefined) break;
    else dataReservation.push(response[i]);
  }
  res.status(200).send(dataReservation);
};
module.exports.userGet = async function (req, res) {
  try {
    const getUser = await userModel.findById(req.params.userId);
    const userFixed = JSON.parse(
      JSON.stringify(getUser).split('"_id":').join('"id":'),
    );
    res.status(200).json(userFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.userDelete = async function (req, res) {
  try {
    const updatedUser = await userModel.updateOne(
      {
        _id: req.params.userId,
      },
      {
        $set: {
          isActive: req.body.isActive,
        },
      },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.userUpdate = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  try {
    const updatedUser = await userModel.updateOne(
      {
        _id: ObjectId(req.body._id),
      },
      req.body,
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.reservationsGetByUserId = async function (req, res) {
  const response = res.locals.allReservations;
  const rangeFilters = res.locals.rangeFilters;
  let dataReservation = [];

  for (i = rangeFilters[0]; i < rangeFilters[1]; i++) {
    if (response[i] == undefined) break;
    else dataReservation.push(response[i]);
  }
  res.status(200).send(dataReservation);
};
module.exports.reservationsDelete = async function (req, res) {
  try {
    const reservation = await reservationModel.deleteOne({
      _id: req.params.id,
    });

    const reservationFixed = JSON.parse(
      JSON.stringify(reservation).split('"_id":').join('"id":'),
    );
    res.status(200).json(reservation);
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
    },
    async function (err, obj) {
      if (err) return res.status(404).json('err');
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

module.exports.reservationsEdit = async function (req, res) {
  try {
    const resposneData = req.body;

    const tariffUpdate = await reservationModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          start_time: req.body.start_time,
          hour: req.body.hour,
          vat: req.body.vat,
          isServedVat: req.body.isServedVat,
        },
      },
    );
    res.status(200).send(resposneData);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.reservationGet = async function (req, res) {
  try {
    const reservation = await reservationModel
      .findById(req.params.id)
      .populate('userId');
    const reservationFixed = JSON.parse(
      JSON.stringify(reservation).split('"_id":').join('"id":'),
    );
    res.status(200).json(reservationFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};
