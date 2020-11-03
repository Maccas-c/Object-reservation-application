const reservationModel = require("../models/reservationModel");
const userModel = require("./../models/userModel")

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

module.exports.reservationsGetAll = async function (req, res) {
  try {
    const reservations = await reservationModel.find();
    const users = await userModel.find();
    let resultsres = []
    let resultsusr = []
    let finalReservations = []
    for (let reser of reservations){
          resultsres.push({
            idReservation: reser._id,
            start_time: reser.start_time,
            hour:reser.hour,
            courtid:reser.courtid,
            userid:reser.userid
          })
    }
    for (let usr of users){
      resultsusr.push({
        _id: usr._id,
        email:usr.email,
        name:usr.name,
        surname:usr.surname,
      })
    }
    
    for( let user of resultsusr){
      resultsres.filter(res =>{
        if(user._id.equals(res.userid)){
          finalReservations.push({
            _id: user._id,
            email:user.email,
            name:user.name,
            surname:user.surname,
            ...res
          })
        }
      })
      }
    res.status(200).json(finalReservations);
  } catch (err) {
    console.log(err)
    res.status(404).json(err);
  }
};


module.exports.reservationCreate = async function (req, res) {
  const isExist = reservationModel.findOne(
    {
      start_time: req.body.start_time,
      hour: req.body.hour,
      courtid: req.body.courtId,
      userid: req.body.userId
    },
    async function (err, obj) {
      if (err) return res.status(404).json(err);
      if (obj) return res.status(422).json("The hour is taken");
      else {
        const reservation = new reservationModel({
          start_time: req.body.start_time,
          hour: req.body.hour,
          courtid: req.body.courtId,
          userid: req.body.userId
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
          userid: req.body.userId,
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
