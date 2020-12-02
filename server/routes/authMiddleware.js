const userModel = require('./../models/userModel');
const reservationModel = require('./../models/reservationModel');
const courtModel = require('./../models/courtModel');
const courtsTariff = require('../models/tariffModel');

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.status(401).json({
      msg: 'You are not authorized to view this resource',
    });
  }
};

module.exports.authRole = role => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send('Not allowed');
    }
    next();
  };
};

module.exports.checkUser = (req, res, next) => {
  if (req.body.id == req.user._id) {
    next();
  } else {
    res.status(401).json({
      msg: 'You are diffrent user',
    });
  }
};
module.exports.checkEmail = async function (req, res, next) {
  const isExist = await userModel.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) return res.status(404).json(err);
      else if (user) {
        console.log('req.body.email', req.body.email);
        console.log('user', user);
        console.log('req.user', req.user);
        if (req.body.email == req.user.email) next();
        else return res.status(422).json('The email exist');
      } else next();
    },
  );
};
module.exports.rangeUsers = async function (req, res, next) {
  const usersLength = (await userModel.find()).length;
  const path = req.path.slice(11);
  const header = `${path} 0-${usersLength}/${usersLength}`;
  res.header('Content-Range', header);
  next();
};

module.exports.rangeReservations = async function (req, res, next) {
  const reservationsLength = (await reservationModel.find()).length;
  const path = req.path.slice(11);
  const header = `${path} 0-${reservationsLength}/${reservationsLength}`;
  res.header('Content-Range', header);
  next();
};
module.exports.rangeCourts = async function (req, res, next) {
  const courtLength = (await courtModel.find()).length;
  const path = req.path.slice(11);

  const header = `${path} 0-${courtLength}/${courtLength}`;
  console.log(path);
  console.log(header);
  res.header('Content-Range', header);
  next();
};
module.exports.rangeCourtsTariff = async function (req, res, next) {
  const courtLength = (await courtsTariff.find()).length;
  const path = req.path.slice(11);

  const header = `${path} 0-${courtLength}/${courtLength}`;
  console.log(path);
  console.log(header);
  res.header('Content-Range', header);
  next();
};
