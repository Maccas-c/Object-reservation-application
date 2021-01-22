const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const reservationModel = require('../models/reservationModel');
const courtModel = require('../models/courtModel');
const courtsTariff = require('./../models/tariffModel');
const { validationResult } = require('express-validator');
const queryString = require('query-string');
const moment = require('moment');

// Użytkownicy
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
          isActive: false,
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
// ---------------------------------------------------------

// Rezerwacje
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

  const court = await courtModel.findOne({
    nameCourt: req.body.courtId.nameCourt,
  });
  const courtFixed = JSON.parse(JSON.stringify(court));

  const { _id, sessionTime } = courtFixed;
  console.log(_id, sessionTime);

  const admin = await userModel.findOne({ role: 'admin' });
  const adminFixed = JSON.parse(JSON.stringify(admin));
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
          courtId: ObjectId(_id),
          userId: ObjectId(adminFixed._id),
        });

        try {
          const savedReservation = await reservation.save();
          const findreservation = await reservationModel
            .find({ _id: reservation._id })
            .populate('userId')
            .populate('courtId');
          const responseBody = JSON.parse(
            JSON.stringify(findreservation[0]).split('"_id":').join('"id":'),
          );
          res.status(201).send(responseBody);
        } catch (err) {
          console.log(err);
          res.status(400).json(err);
        }
      }
    },
  );
};
module.exports.reservationsEditMany = async function (req, res) {
  try {
    const resposneData = req.body;

    const reservations = await reservationModel.updateMany(
      { _id: req.params.id },
      {
        $set: {
          isServedVat: true,
        },
      },
    );
    res.status(200).send(resposneData);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.reservationsEdit = async function (req, res) {
  try {
    const reservationUpdate = await reservationModel.updateMany(
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
      .populate('userId')
      .populate('courtId');
    const reservationFixed = JSON.parse(
      JSON.stringify(reservation).split('"_id":').join('"id":'),
    );
    res.status(200).json(reservationFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};
// ---------------------------------------------------------

// Boiska
module.exports.courtsGet = async function (req, res) {
  try {
    const courts = await courtModel.find();
    let courtsFixed = JSON.parse(
      JSON.stringify(courts).split('"_id":').join('"id":'),
    );
    res.status(200).json(courtsFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.courtsCreate = async function (req, res) {
  console.log(req.body.date);
  const isExist = courtModel.findOne(
    {
      ids: req.params.ids,
    },
    async function (err, court) {
      if (err) return res.status(404).json(err);
      else {
        const court = new courtModel({
          ids: req.body.ids,
          nameCourt: req.body.nameCourt,
          description: req.body.description,
          date: req.body.date,
          sessionTime: req.body.sessionTime,
        });
        try {
          const savedCourt = await court.save();
          res.status(201).json(savedCourt);
        } catch (err) {
          res.status(400).json(err);
        }
      }
    },
  );
};

module.exports.courtsDelete = async function (req, res) {
  try {
    const deletedCourt = await courtModel.deleteOne({
      _id: req.params.courtId,
    });
    res.status(200).json(deletedCourt);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.courtsUpdate = async function (req, res) {
  try {
    const updatedCourt = await courtModel.updateOne(
      {
        _id: req.params.courtId,
      },
      {
        $set: {
          ids: req.body.id,
          nameCourt: req.body.nameCourt,
          description: req.body.description,
          date: req.body.date.map(date => {
            return {
              nameOfDay: date.nameOfDay,
              value: date.value,
            };
          }),
        },
      },
    );
    res.status(200).json(updatedCourt);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.getCourt = async function (req, res) {
  try {
    const getCourt = await courtModel.findById(req.params.courtId);
    res.status(200).json(getCourt);
  } catch (err) {
    res.status(404).json(err);
  }
};
// ---------------------------------------------------------

// Cennik
module.exports.tariffCreate = async function (req, res) {
  const courts = new courtsTariff({
    ids: req.body.ids,
    name: req.body.name,
    classes_and_sports_training: req.body.classes_and_sports_training,
    tournament_matches: req.body.tournament_matches,
    university_club: req.body.university_club,
  });
  try {
    const savedCourt = await courts.save();
    res.status(201).json(savedCourt);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports.tariffsGet = async function (req, res) {
  try {
    const tariff = await courtsTariff.find();
    const tariffFixed = JSON.parse(
      JSON.stringify(tariff).split('"_id":').join('"id":'),
    );
    res.status(200).json(tariffFixed);
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};
module.exports.tariffGet = async function (req, res) {
  try {
    const tariff = await courtsTariff.findById(req.params.id);
    const tariffFixed = JSON.parse(
      JSON.stringify(tariff).split('"_id":').join('"id":'),
    );
    res.status(200).json(tariffFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.tariffUpdate = async function (req, res) {
  try {
    const resposneData = req.body;
    const tariffUpdate = await tariffModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          ids: req.body.ids,
          name: req.body.name,
          classes_and_sports_training: req.body.classes_and_sports_training,
          tournament_matches: req.body.tournament_matches,
          university_club: req.body.university_club,
        },
      },
    );
    res.status(200).send(resposneData);
  } catch (err) {
    res.status(404).json(err);
  }
};
