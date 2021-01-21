const express = require('express');
const passport = require('passport');
const oauth = require('oauth');
const { isAuth } = require('./../controllers/middleware');
const router = express.Router();
const loginUsosController = require('./../controllers/loginUsosController');

router.get('/api/loginUsos', loginUsosController.login);

router.get('/api/loginUsos/connect', passport.authenticate('oauth'));

router.get(
  '/api/loginUsos/callback',
  passport.authenticate('oauth', {
    successRedirect: 'http://localhost:3000/login',
    failureRedirect: '/api/loginUsos/connect',
  }),
);

router.get('/api/loginUsos/logout', isAuth, loginUsosController.logout);

module.exports = router;
