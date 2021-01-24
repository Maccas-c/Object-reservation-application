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
  if (!req.headers.cookie) res.status(401).end('not admin');
  else if (req.session.passport.user.role == 'admin') next();
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
        if (req.body.email == req.user.email) next();
        else return res.status(422).json('Podany e-mail istnieje');
      } else next();
    },
  );
};
