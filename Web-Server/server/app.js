const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const usoModel = require('./models/userModel2');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require("express-session");
const bodyParser = require('body-parser');
const mongoStore = require("connect-mongo")(session);
const passport = require('passport');
const OAuth1Strategy = require('passport-oauth1');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reservationRouter = require('./routes/reservations');
const courtRouter = require('./routes/courts');

const userModel = require('./models/userModel2')


//DATABASE
const connection = require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

mongoose.connect(
  "mongodb+srv://DBadmin:sl6YGEEZVTUgu3Te@developteam-y4es9.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + "atlas");
});

app.use(bodyParser.json());
app.use(
  session({
    secret: "very secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 5 * 60,
      autoRemove: "native",
    }),
    dbName: "DevelopTeam",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
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
  callbackURL: "http:/localhost:3001/sessions/callback",
  signatureMethod: "HMAC-SHA1"
}, function (token, tokenSecret, profile, cb) {
  process.nextTick(function () {
    userModel.findOne({
      'name.id': profile.id
    }, async function (err, user) {
      if (err) return cb(err);
      if (user) return cb(null, user);
      else {
        const newUser = new userModel();
        newUser.name.token = token;
        newUser.name.tokenSecret= tokenSecret;

        await newUser.save(function (err) {
          if (err) throw err;
          return cb(null, newUser);
        })
        console.log(profile);
      }
    })
  })
}));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/sessions/connect", passport.authenticate('oauth'));

app.get('/sessions/callback', passport.authenticate('oauth', {
    failureRedirect: '/logout'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get("/logout", function (req, res) {
  res.send('hej');
});




app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);
app.use(usersRouter);
app.use(reservationRouter);
app.use(courtRouter);


module.exports = app;
