const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/password').genPassword;
const connection = require('../config/database');
const isAuth = require('./authMiddleware').isAuthLocal;
// const isAdmin = require('./authMiddleware').isAdminLocal;
const localUser = require('../models/userModel');

router.post('/api/login', passport.authenticate('local'), function (req, res) {
  res.json({
    name: req.user.name,
    surname: req.user.surname,
    email: req.user.login.email,
    isActive: req.user.isActive
  });
  // res.send(req.user.isActive)
});

router.get('/api/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send({
    message: 'Successfully logged out'
  });
});

router.get('/api/login-success', isAuth, (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

module.exports = router;
