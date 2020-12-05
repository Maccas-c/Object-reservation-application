const { ObjectId } = require('mongodb');
const userModel = require('../models/userModel');
const reservationModel = require('../models/reservationModel');
const { validationResult } = require('express-validator');
const queryString = require('query-string');

module.exports.usersGet = async function (req, res) {
  if (req.query.filter && req.query.sort) {
    let filter = JSON.parse(req.query.filter);
    const sorted = JSON.parse(req.query.sort);
    const key = sorted[0];
    const value = sorted[1] === 'ASC' ? '1' : '-1';
    try {
      const users = await userModel.find(filter).sort({ [key]: value });
      user = JSON.parse(JSON.stringify(users).split('"_id":').join('"id":'));
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(404).json(err);
    }
  } else {
    res.status(404).end('no filter and sort');
  }
};
module.exports.userGet = async function (req, res) {
  try {
    const getUser = await userModel.findById(req.params.userId);
    user = JSON.parse(JSON.stringify(getUser).split('"_id":').join('"id":'));
    res.status(200).json(user);
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
  if (req.query.filter && req.query.sort) {
    let filter = JSON.parse(req.query.filter);
    const sort = JSON.parse(req.query.sort);

    let key = Object.keys(filter).toString();
    console.log(key);
    const keySorted = sort[0];
    const valueSorted = keySorted[1] === 'ASC' ? '1' : '-1';
    if (key === 'name' || key === 'surname') {
      try {
        const users = await userModel.find(filter);
        let ids = [];
        for (const user of users) {
          ids.push(user._id);
        }
        const reservations = await reservationModel
          .find({ userid: { $in: ids } })
          .populate('userid')
          .sort({ [keySorted]: valueSorted });

        const reservationFixed = JSON.parse(
          JSON.stringify(reservations).split('"_id":').join('"id":'),
        );

        res.status(200).send(reservationFixed);
      } catch (err) {
        console.log(err);
        res.status(404).json(err);
      }
    } else {
      try {
        const reservations = await reservationModel
          .find(filter)
          .populate('userid')
          .sort({ [keySorted]: valueSorted });
        const reservationFixed = JSON.parse(
          JSON.stringify(reservations).split('"_id":').join('"id":'),
        );

        res.status(200).send(reservationFixed);
      } catch (err) {
        console.log(err);
        res.status(404).json(err);
      }
    }
  } else {
    res.status(404).end('no query and sort');
  }
};
module.exports.reservationsDelete = async function (req, res) {
  console.log(req.params.id);
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
