const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/password').genPassword;
const connection = require('../config/database');
const isAuth = require('./authMiddleware').isAuthLocal;
//const isAdmin = require('./authMiddleware').isAdminLocal;
const localUser = require('../models/userModel');

router.post('/api/login', passport.authenticate('local'), function (req, res) {
  if (req.user) {
    res.status(200).json({
      email: req.user.login.email,
      name: req.user.name,
      surname: req.user.surname,
      sex: req.user.sex,
      role: req.user.role
    });
  } else {
    res.status(404).end();
  }
});

router.get('/api/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return res.status(404);
  });
  res.clearCookie('connect.sid', function (err) {
    if (err) return res.status(404);
  });
  req.session.destroy(function (err) {
    if (err) return res.status(404);
    res.send({
      message: 'Successfully logged out'
    });
  });
});

// router.get("/api/login-success", isAuth, (req, res, next) => {
//   res.send(
//     '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
//   );
// });

module.exports = router;
