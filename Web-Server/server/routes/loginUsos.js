const express = require('express');
const passport = require('passport');
const oauth = require("oauth");
const userModel = require('../models/userModel2')
const router = express.Router();
const consumer = new oauth.OAuth(
    "https://usosapps.amu.edu.pl/services/oauth/request_token",
    "https://usosapps.amu.edu.pl/services/oauth/access_token",
    process.env.USOS_CONSUMER_KEY,
    process.env.USOS_CONSUMER_SECRET,
    "1.0",
    "http:/localhost:3000/sessions/callback",
    "HMAC-SHA1"
);

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect('/loginUsos/brakDostepu');
    }
}

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

router.get('/loginUsos/:id', checkAuthentication, async function (req, res) {
    const user = await userModel.findById({
        _id: req.params.id
    });
    consumer.get('https://usosapps.amu.edu.pl/services/users/user', user.name.token, user.name.tokenSecret, function (error, data, response) {
        if (error) {
            console.log(error)
            res.redirect('/loginUsos/connect');
        } else {
            var parsedData = JSON.parse(data);
            console.log(parsedData);
            res.send(`You are signed in:  + ${parsedData.first_name} + ${parsedData.last_name} + ${parsedData.id}`);
        }
    });
});

module.exports = router;