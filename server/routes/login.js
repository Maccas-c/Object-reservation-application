const router = require('express').Router();
const passport = require('passport');
const { isAuth } = require('./../controllers/middleware');
const loginController = require('./../controllers/loginController');

router.post(
  '/api/login/',
  passport.authenticate('local'),
  loginController.login,
);

router.get('/api/checkUser', loginController.login);

router.post(
  '/api/login/:role',
  passport.authenticate('local'),
  loginController.login,
);

router.get('/api/logout', loginController.logout);

module.exports = router;
