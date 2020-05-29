module.exports.login = function (req, res) {
  if (req.user) {
    res.status(200).json({
      id: req.user.id,
      email: req.user.login.email,
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
  res.clearCookie("connect.sid", function (err) {
    if (err) return res.status(404);
  });
  req.session.destroy(function (err) {
    if (err) return res.status(404);
    res.send({
      message: "Successfully logged out",
    });
  });
};
