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
module.exports.isAdmin = (req, res, next) => {
  if (req.headers['react-admin'] == process.env.REACT_APP_SECRET) next();
  else return res.status(401).end('not admin');
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

module.exports.rangeCourts = async function (req, res, next) {
  const courtLength = (await courtModel.find()).length;
  const path = req.path.slice(11);
  const header = `${path} 0-${courtLength}/${courtLength}`;
  res.header('Content-Range', header);
  next();
};
module.exports.rangeCourtsTariff = async function (req, res, next) {
  const TariffLength = (await courtsTariff.find()).length;
  const path = req.path.slice(11);
  const header = `${path} 0-${TariffLength}/${TariffLength}`;
  res.header('Content-Range', header);
  next();
};
