const express = require('express');
const passport = require('passport');
const oauth = require("oauth");
const userModel = require('../models/userModel')
const isAuth = require('./authMiddleware').isAuth;
const router = express.Router();

// module.exports.isAuth = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).json({ msg: 'You are not authorized to view this resource' });
//     }
// }


// function checkAuthentication(req, res, next) {
//     if (req.isAuthenticated()) {
//         //req.isAuthenticated() will return true if user is logged in
//         next();
//     } else {
//         res.redirect('/loginUsos/brakDostepu');
//     }
// }

router.get('/loginUsos', function (req, res, next) {
    res.send('respond with a resource');
});

router.get("/loginUsos/connect", passport.authenticate('oauth'));

router.get('/loginUsos/callback', passport.authenticate('oauth', {
    successRedirect: '/',
    failureRedirect: '/loginUsos/brakDostepu'
}));

router.get('/loginUsos/brakDostepu', function (req, res) {
    res.send('Brak dostepu do danych');
});
router.get('/loginUsos/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
});

module.exports = router;