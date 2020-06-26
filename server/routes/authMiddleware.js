const userModel = require('./../models/userModel');

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

module.exports.authRole = (role) => {
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
module.exports.checkEmail = (req, res, next) => {
  const isExist = userModel.findOne({ email: req.body.email }, async function (
    err,
    user
  ) {
    if (err) return res.status(404).json(err);
    else if (user) {
      if (req.body.email == req.user.email) next();
      else return res.status(422).json('The email exist');
    } else next();
  });
};
