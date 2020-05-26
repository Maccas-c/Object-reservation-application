module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resource",
    });
  }
};

module.exports.authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send("Not allowed");
    }
    next();
  };
};

module.exports.checkUser = (req, res, next) => {
  if (req.body._id == req.user._id) {
    next();
  } else {
    res.status(401).json({
      msg: "You are diffrent user",
    });
  }
};
