const passport = require('passport');
const oauth = require('oauth');
const OAuth1Strategy = require('passport-oauth1');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const { validPassword } = require('../lib/password');

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
//passport.deserializeUser(function (user, cb) {
//  cb(null, user);
//});
passport.deserializeUser(function (user, cb) {
  userModel.findById(user._id, function (err, user) {
    cb(err, user);
  });
});
const consumer = new oauth.OAuth(
  'https://usosapps.amu.edu.pl/services/oauth/request_token',
  'https://usosapps.amu.edu.pl/services/oauth/access_token',
  process.env.USOS_CONSUMER_KEY,
  process.env.USOS_CONSUMER_SECRET,
  '1.0',
  'http:/localhost:3000/api/loginUsos/callback',
  'HMAC-SHA1',
  null,
);
let usosClient = new OAuth1Strategy(
  {
    requestTokenURL:
      'https://usosapps.amu.edu.pl/services/oauth/request_token?scopes=student_exams|personal|email|staff_perspective|cards|studies',
    accessTokenURL: 'https://usosapps.amu.edu.pl/services/oauth/access_token',
    userAuthorizationURL:
      'https://usosapps.amu.edu.pl/services/oauth/authorize',
    consumerKey: process.env.USOS_CONSUMER_KEY,
    consumerSecret: process.env.USOS_CONSUMER_SECRET,
    callbackURL: 'http:/localhost:3001/api/loginUsos/callback',
    signatureMethod: 'HMAC-SHA1',
  },
  function (accessToken, tokenSecret, profile, cb) {
    process.nextTick(async function () {
      await userModel.findOne(
        {
          email: profile.email,
        },
        async function (err, user) {
          if (err) return cb(err);
          if (user) {
            if (user.isActive === false) {
              await user.update({
                isActive: true,
              });
              user.save();
              return cb(null, user);
            } else return cb(null, user);
          } else {
            const newUser = new userModel({
              idUsos: profile.id,
              email: profile.email,
              student_status: profile.student_status,
              student_number: profile.student_number,
              name: profile.first_name,
              surname: profile.last_name,
              sex: profile.sex,
              isStudent: true,
              isActive: true,
            });
            await newUser.save(function (err) {
              if (err) throw err;
              return cb(null, newUser);
            });
          }
        },
      );
    });
  },
);
usosClient.userProfile = function (token, tokenSecret, params, cb) {
  consumer.get(
    'https://usosapps.amu.edu.pl/services/users/user?fields=id|email|first_name|last_name|sex|student_number|student_status',
    token,
    tokenSecret,
    function (error, data, response) {
      if (error) {
        return cb(error);
      }
      try {
        const parsedData = JSON.parse(data);
        if ((parsedData['sex'] = 'M')) parsedData['sex'] = 'male';
        else parsedData['sex'] = 'female';
        cb(null, parsedData);
      } catch (e) {
        return cb(e);
      }
    },
  );
};
passport.use(usosClient);

//passport-local
const customFields = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const verifyCallback = (req, email, password, done) => {
  console.log(req.query);
  userModel
    .findOne({
      email: email,
      isActive: true,
      role: req.params.role,
    })
    .then(user => {
      if (!user) {
        return done(null, false);
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);
module.exports.consumer = consumer;
