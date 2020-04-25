const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reservationRouter = require('./routes/reservations');
const courtRouter = require('./routes/courts');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( indexRouter);
app.use( usersRouter);
app.use(reservationRouter);
app.use(courtRouter);

//DATABASE
require('./config/database');

module.exports = app;