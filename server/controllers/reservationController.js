const { Double } = require('mongodb');
const { db, insertMany } = require('../models/reservationModel');
const reservationModel = require('../models/reservationModel');
const userModel = require('./../models/userModel');
const courtsTariff = require('../models/tariffModel');
const courtModel = require('../models/courtModel');
const moment = require('moment');

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

module.exports.reservationAddBasket2 = async function (req, res) {
  const isExist = reservationModel.findOne(
    {
      start: moment(req.body.start).add(1, 'hours'),
      courtId: req.body.courtId,
    },
    async function (err, obj) {
      if (err) return res.status(404).json(err);
      if (obj) return res.status(422).json('Godzina zajęta');
      else {
        let start = moment(req.body.start);

        let titleDate = start.format('HH:mm');

        let day = start.format('DD');
        let year = start.format('YYYY');
        let month = start.format('MM');
        const dayString = year + '-' + month + '-' + day;

        const reservation = new reservationModel({
          title: titleDate,
          start: moment(req.body.start).add(1, 'hours'),
          dayString: dayString,
          end: moment(req.body.start)
            .add(1, 'hours')
            .add(req.body.duration, 'm'),
          courtId: req.body.courtId,
          userId: req.body.userId,
        });
        try {
          const savedReservation = await reservation.save();
          const result = [{ reservation, msg: 'Dodano rezerwację' }];
          res.status(201).json(result);
        } catch (err) {
          res
            .status(400)
            .json({ msg: 'Wystąpił błąd przy dodawaniu rezerwacji' });
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
    const reservations = await reservationModel
      .find({
        userId: userId,
      })
      .populate('courtId');
    const reservationsFixed = JSON.parse(
      JSON.stringify(reservations).split('"_id":').join('"id":'),
    );
    res.status(200).json(reservationsFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.reservationsGetByDate = async function (req, res) {
  const start = moment(req.body.date);

  let day = start.format('DD');
  let year = start.format('YYYY');
  let month = start.format('MM');
  const dayString = year + '-' + month + '-' + day;

  let dates = [
    { hour: '15:00', durationTime: '15:00-16:30', free: true },
    { hour: '16:30', durationTime: '16:30-18:00', free: true },
    { hour: '18:00', durationTime: '18:00-19:30', free: true },
    { hour: '19:30', durationTime: '19:30-21:00', free: true },
    { hour: '21:00', durationTime: '21:00-22:30', free: true },
  ];
  const date = req.body.date;
  try {
    const reservations = await reservationModel
      .find({
        dayString: dayString,
      })
      .populate('courtId');
    dates.forEach(item =>
      reservations.forEach(rs => {
        if (
          item.hour == rs.title &&
          rs.courtId.nameCourt == req.body.nameCourt
        ) {
          item.free = false;
        }
      }),
    );
    res.status(200).json(dates);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.reservationAddBasket = async function (req, res) {
  let isStudent = false;
  const isExist = reservationModel.findOne(
    {
      start: moment(req.body.start).add(1, 'hours'),
      courtId: req.body.courtId,
    },
    async function (err, obj) {
      if (err) return res.status(404).json(err);
      if (obj) return res.status(422).json('Godzina zajęta');
      else {
        let start = moment(req.body.start);

        let titleDate = start.format('HH:mm');

        let day = start.format('DD');
        let year = start.format('YYYY');
        let month = start.format('MM');
        const dayString = year + '-' + month + '-' + day;
        try {
          const user = await userModel.findById(req.body.userId);

          const userParsed = JSON.parse(JSON.stringify(user));

          let sumPrice = 0;
          userParsed.reservations.forEach(item => {
            sumPrice += parseInt(item.price);
          });

          const court = await courtModel
            .findOne({ _id: req.body.courtId })
            .populate('tariffId');

          const courtParsed = JSON.parse(JSON.stringify(court));

          const activity = req.body.activity;

          let qw = 0;
          if (activity == 'classes_and_sports_training') {
            qw = courtParsed.tariffId.classes_and_sports_training;
          }
          if (activity == 'tournament_matches') {
            qw = courtParsed.tariffId.tournament_matches;
          }
          if (activity == 'university_club') {
            qw = courtParsed.tariffId.university_club;
          }
          const price = userParsed.isStudent ? qw * 0.5 : qw;

          sumPrice = parseInt(sumPrice) + parseInt(price);

          const userUpdate = await userModel.findOneAndUpdate(
            {
              _id: req.body.userId,
            },
            {
              $push: {
                reservations: {
                  title: titleDate,
                  start: moment(req.body.start).add(1, 'hours').toDate(),
                  dayString: dayString,
                  end: moment(req.body.start)
                    .add(1, 'hours')
                    .add(req.body.duration, 'm')
                    .toDate(),
                  courtId: req.body.courtId,
                  nameCourt: req.body.nameCourt,
                  userId: req.body.userId,
                  isPaid: false,
                  price: price,
                  vat: req.body.vat,
                },
              },
              $set: {
                sumPrice: sumPrice,
              },
            },
            { new: true },
          );

          // const result = [{ msg: 'Pomyślnie dodano rezerwacje' }];
          res.status(201).json(userUpdate);
        } catch (err) {
          res.status(400).json(err);
        }
      }
    },
  );
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
    res.status(404).send(err);
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

    next();
  } catch (err) {
    res.status(404).send(err);
  }
};
