const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoStore = require('connect-mongo')(session);
const passport = require('passport');
require('dotenv').config();
require('./config/passport');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reservationRouter = require('./routes/reservations');
const courtRouter = require('./routes/courts');
const loginUsosRouter = require('./routes/loginUsos');
const login = require('./routes/login');
const connection = require('./config/database');
const crypto = require('crypto');
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(logger('dev'));
app.use(express.json());
app.use(
  session({
    secret: process.env.OAUTH_SECRET,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 5 * 60,
      autoRemove: 'native'
    }),
    dbName: 'DevelopTeam',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRouter);
app.use(usersRouter);

app.use(reservationRouter);
app.use(courtRouter);
app.use(loginUsosRouter);
app.use(login);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '../client/build/index.html'));
// });

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
