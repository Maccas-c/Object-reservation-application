const passport = require('passport');
const oauth = require("oauth");
const OAuth1Strategy = require('passport-oauth1');
const userModel = require('../models/userModel')
const mongoose = require('mongoose');

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj)
});
const consumer = new oauth.OAuth(
    "https://usosapps.amu.edu.pl/services/oauth/request_token",
    "https://usosapps.amu.edu.pl/services/oauth/access_token",
    process.env.USOS_CONSUMER_KEY,
    process.env.USOS_CONSUMER_SECRET,
    "1.0",
    "http:/localhost:3000/sessions/callback",
    "HMAC-SHA1"
);
let usosClient = new OAuth1Strategy({
        requestTokenURL: 'https://usosapps.amu.edu.pl/services/oauth/request_token',
        accessTokenURL: 'https://usosapps.amu.edu.pl/services/oauth/access_token',
        userAuthorizationURL: 'https://usosapps.amu.edu.pl/services/oauth/authorize',
        consumerKey: process.env.USOS_CONSUMER_KEY,
        consumerSecret: process.env.USOS_CONSUMER_SECRET,
        callbackURL: "http:/localhost:3001/loginUsos/callback",
        signatureMethod: "HMAC-SHA1",
        scopes: ['https://usosapps.amu.edu.pl/services/users/user']
    },
    function (accessToken, tokenSecret, profile, cb) {
        process.nextTick(function () {
            console.log('profile', profile);
            userModel.findOne({
                'longing2.id': profile.id
            }, async function (err, user) {
                if (err) return cb(err);
                if (user) return cb(null, user);
                else {
                    const newUser = new userModel({
                        longing2: {
                            id: profile.id,
                            name: profile.first_name,
                            surname: profile.last_name,
                            token: accessToken,
                            tokenSecret: tokenSecret
                        }
                    });
                    await newUser.save(function (err) {
                        if (err) throw err;
                        return cb(null, newUser);
                    })
                }
            })
        })
    });
usosClient.userProfile = function (token, tokenSecret, params, cb) {
    consumer.get('https://usosapps.amu.edu.pl/services/users/user', token, tokenSecret, function (error, data, response) {
        if (error) {
            return cb(error);
        }
        try {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            cb(null, parsedData);
        } catch (e) {
            return cb(e);
        }

    });
};
passport.use(usosClient);