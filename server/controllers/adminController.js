const { ObjectId } = require('mongodb');
const userModel = require('../models/userModel');
const reservationModel = require('../models/reservationModel');
const courtModel = require('../models/courtModel');
const { validationResult } = require('express-validator');
const queryString = require('query-string');
const moment = require('moment');

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
  let dayToDate = moment.utc(req.body.dayString);
  let hour = req.body.title.slice(0, 2);
  let minute = req.body.title.slice(3, 5);
  console.log(hour, minute);
  dayToDate.set({ hour: hour, minute: minute, second: 0, millisecond: 0 });

  let day = dayToDate.format('DD');
  let year = dayToDate.format('YYYY');
  let month = dayToDate.format('MM');
  const dayString = year + '-' + month + '-' + day;
  console.log(dayToDate);

  const court = await courtModel.find({ nameCourt: req.body.courtId });
  const courtFixed = JSON.parse(JSON.stringify(court));

  const { _id, sessionTime } = courtFixed[0];
  console.log(_id, sessionTime);

  const isExist = reservationModel.findOne(
    {
      dayString: dayString,
      courtId: _id,
      title: req.body.title,
    },
    async function (err, obj) {
      if (err) return res.status(404).json('err');
      if (obj) return res.status(422).json('The hour is taken');
      else {
        const reservation = new reservationModel({
          start: dayToDate,
          dayString: dayString,
          end: moment
            .utc(req.body.dayString)
            .set({ hour: hour, minute: minute, second: 0, millisecond: 0 })
            .add(sessionTime, 'm'),
          title: req.body.title,
          courtId: _id,
          userId: req.body.userId,
        });
        try {
          console.log(req.body);
          const savedReservation = await reservation.save();
          res.status(201).json(req.body);
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

    const reservationUpdate = await reservationModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          start: req.body.start,
          title: req.body.title,
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
