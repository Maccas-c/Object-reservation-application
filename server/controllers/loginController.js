module.exports.login = function (req, res) {
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      surname: req.user.surname,
      sex: req.user.sex,
      role: req.user.role,
    });
  } else {
    res.status(404).end();
  }
};

module.exports.logout = function (req, res) {
  req.logout(function (err) {
    if (err) return res.status(404);
  });
  res.clearCookie('connect.sid', function (err) {
    if (err) return res.status(404);
  });
  req.session.destroy(function (err) {
    if (err) return res.status(404);
    res.status(200).send({
      message: 'Successfully logged out',
    });
  });
};
