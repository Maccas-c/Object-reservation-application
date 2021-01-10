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

module.exports.getPrice = async function (req, res, next) {
  let body = req.body;
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
    console.log('keys', Object.keys(grouped));
    const wholeCourt = ifundefined(grouped['D']);
    const partsCourt =
      ifundefined(grouped['A']) +
      ifundefined(grouped['B']) +
      ifundefined(grouped['C']);
    let cennik = JSON.parse(JSON.stringify(tariffdoc));
    if (isStudent) {
      price =
        wholeCourt * cennik[0].university_club +
        partsCourt * cennik[1].university_club;
    } else {
      price =
        wholeCourt * cennik[0].tournament_matches +
        partsCourt * cennik[1].tournament_matches;
    }
    res.locals.price = price;
    console.log(price);
    next();
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

module.exports.getPriceFront = async function (req, res) {
  let body = req.body;
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
    console.log('keys', Object.keys(grouped));
    const wholeCourt = ifundefined(grouped['D']);
    const partsCourt =
      ifundefined(grouped['A']) +
      ifundefined(grouped['B']) +
      ifundefined(grouped['C']);
    let cennik = JSON.parse(JSON.stringify(tariffdoc));
    if (isStudent) {
      price =
        wholeCourt * cennik[0].university_club +
        partsCourt * cennik[1].university_club;
    } else {
      price =
        wholeCourt * cennik[0].tournament_matches +
        partsCourt * cennik[1].tournament_matches;
    }
    res.status(200).send(JSON.stringify(price));
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};
