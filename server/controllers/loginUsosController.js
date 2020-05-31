module.exports.login = function (req, res) {
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      surname: req.user.surname,
      sex: req.user.sex,
      email: req.user.email,
      student_number: req.user.student_number,
      role: req.user.role
    });
  } else {
    res.status(404).end();
  }
};

module.exports.logout = function (req, res) {
  res.clearCookie('connect.sid', function (err) {
    if (err) return res.status(404);
  });
  req.session.destroy(function (err) {
    if (err) return res.status(404);
    res
      .status(200)
      .redirect(
        'https://usosweb.amu.edu.pl/kontroler.php?_action=logowaniecas/wyloguj'
      );
  });
};
