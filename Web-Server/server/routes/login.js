const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/password').genPassword;
const connection = require('../config/database');
const isAuth = require('./authMiddleware').isAuthLocal;
// const isAdmin = require('./authMiddleware').isAdminLocal;
const localUser = require('../models/userModel');


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success'
}));


router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;