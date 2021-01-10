const router = require('express').Router();
const passport = require('passport');
const { isAuth, checkUser } = require('./../routes/authMiddleware');
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

router.get('/api/logout', isAuth, loginController.logout);

module.exports = router;
