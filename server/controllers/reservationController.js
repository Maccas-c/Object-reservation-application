const { Double } = require('mongodb');
const { db } = require('../models/reservationModel');
const reservationModel = require('../models/reservationModel');
const userModel = require('./../models/userModel');
const courtsTariff = require('../models/tariffModel');
const groupBy = (list, key) =>
  list.reduce(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {},
  );
const ifundefined = court => {
  if (court == undefined) return 0;
  else return court.length;
};

module.exports.getPrice = async function (req, res) {
  const body = await req.body;
  let price = 0;
  let isStudent = false;
  try {
    const user = await userModel.findById(body[0].userId);
    const tariffdoc = await courtsTariff.find();

    body.forEach(element => {
      delete element['uuid'];
    });

    const userParsed = JSON.parse(JSON.stringify(user));
    if (userParsed.isStudent == true) {
      isStudent = true;
    }

    let grouped = groupBy(body, 'courtId');
    const wholeCourt = grouped.d.length;
    const partsCourt =
      ifundefined(grouped.a) + ifundefined(grouped.b) + ifundefined(grouped.c);

    let cennik = JSON.parse(JSON.stringify(tariffdoc));
    console.log(cennik);
    console.log(cennik[0].university_club);
    console.log(cennik[1].tournament_matches);
    if (isStudent) {
      price =
        wholeCourt * cennik[0].university_club +
        partsCourt * cennik[1].university_club;
    } else {
      price =
        wholeCourt * cennik[0].tournament_matches +
        partsCourt * cennik[1].tournament_matches;
    }
    res.status(200).send(price);
  } catch (err) {
    res.status(404).send(err);
  }
  console.log(price);
};
module.exports.reservationsGet = async function (req, res) {
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
    const reservations = await reservationModel.find().populate('userId');
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
  const body = await req.body;

  body.forEach(element => {
    delete element['uuid'];
  });

  reservationModel
    .insertMany(body)
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
          userId: req.body.userId,
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
      userId: userId,
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(404).json(err);
  }
};
