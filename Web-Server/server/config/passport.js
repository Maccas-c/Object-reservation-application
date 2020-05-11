const passport = require("passport");
const oauth = require("oauth");
const OAuth1Strategy = require("passport-oauth1");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const validPassword = require("../lib/password").validPassword;

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
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
let usosClient = new OAuth1Strategy(
  {
    requestTokenURL: "https://usosapps.amu.edu.pl/services/oauth/request_token",
    accessTokenURL: "https://usosapps.amu.edu.pl/services/oauth/access_token",
    userAuthorizationURL:
      "https://usosapps.amu.edu.pl/services/oauth/authorize",
    consumerKey: process.env.USOS_CONSUMER_KEY,
    consumerSecret: process.env.USOS_CONSUMER_SECRET,
    callbackURL: "http:/localhost:3001/loginUsos/callback",
    signatureMethod: "HMAC-SHA1",
    scopes: ["https://usosapps.amu.edu.pl/services/users/user"],
  },
  function (accessToken, tokenSecret, profile, cb) {
    process.nextTick(function () {
      userModel.findOne(
        {
          "longing2.id": profile.id,
        },
        async function (err, user) {
          if (err) return cb(err);
          if (user) return cb(null, user);
          else {
            const newUser = new userModel({
              longing2: {
                id: profile.id,
                token: accessToken,
                tokenSecret: tokenSecret,
              },
              name: profile.first_name,
              surname: profile.last_name,
              isStudent: true,
            });
            await newUser.save(function (err) {
              if (err) throw err;
              return cb(null, newUser);
            });
          }
        }
      );
    });
  }
);
usosClient.userProfile = function (token, tokenSecret, params, cb) {
  consumer.get(
    "https://usosapps.amu.edu.pl/services/users/user",
    token,
    tokenSecret,
    function (error, data, response) {
      if (error) {
        return cb(error);
      }
      try {
        const parsedData = JSON.parse(data);
        cb(null, parsedData);
      } catch (e) {
        return cb(e);
      }
    }
  );
};
passport.use(usosClient);

//passport-local
const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = (email, password, done) => {
  userModel
    .findOne({
      "login.email": email,
    })
    .then((user) => {
      console.log(user);
      if (!user) {
        return done(null, false);
      }

      const isValid = validPassword(password, user.login.hash, user.login.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);
