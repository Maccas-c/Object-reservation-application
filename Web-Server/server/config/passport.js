const passport = require('passport');
const OAuth1Strategy = require('passport-oauth1');
const userModel = require('../models/userModel')

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
    userModel.findById(id, function (err, user) {
        if (err) return cb(err)
        cb(null, user);
    })
});

passport.use(new OAuth1Strategy({
    requestTokenURL: 'https://usosapps.amu.edu.pl/services/oauth/request_token',
    accessTokenURL: 'https://usosapps.amu.edu.pl/services/oauth/access_token',
    userAuthorizationURL: 'https://usosapps.amu.edu.pl/services/oauth/authorize',
    consumerKey: process.env.USOS_CONSUMER_KEY,
    consumerSecret: process.env.USOS_CONSUMER_SECRET,
    callbackURL: "http:/localhost:3001/loginUsos/callback",
    signatureMethod: "HMAC-SHA1"
}, function (token, tokenSecret, profile, cb) {
    process.nextTick(function () {
        userModel.findOne({
            'longing2.id': profile.id
        }, async function (err, user) {
            if (err) return cb(err);
            if (user) return cb(null, user);
            else {
                const newUser = new userModel();
                newUser.longing2.token = token;
                newUser.longing2.tokenSecret = tokenSecret;

                await newUser.save(function (err) {
                    if (err) throw err;
                    return cb(null, newUser);
                })
            }
        })
    })
}));