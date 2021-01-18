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

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const reservationRouter = require('./routes/reservations');
const courtRouter = require('./routes/courts');
const adminRouter = require('./routes/admin');
const tariffRouter = require('./routes/tariff');
const paymentRouter = require('./routes/payment');
const loginUsosRouter = require('./routes/loginUsos');
const forgotPassword = require('./routes/forgotPassword');
const resetPassword = require('./routes/resetPassword');
const updatePasswordViaEmail = require('./routes/updatePasswordViaEmail');
const login = require('./routes/login');
const connection = require('./config/database');
const crypto = require('crypto');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
require('./config/passport');
const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      title: 'Develop_team',
      description: 'Api information',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
  },
  apis: [
    './swagger/admin.js',
    './swagger/users.js',
    './swagger/reservations.js',
  ],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  cors({
    credentials: true,
    methods: 'GET,PUT,PATCH,DELETE,POST',
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    exposedHeaders: 'Content-Range',
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(logger('dev'));
app.use(express.json());

app.use(
  session({
    secret: process.env.OAUTH_SECRET,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 30 * 60,
      autoRemove: 'native',
    }),
    dbName: 'DevelopTeam',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRouter);
app.use(usersRouter);
app.use(adminRouter);
app.use(reservationRouter);
app.use(courtRouter);
app.use(loginUsosRouter);
app.use(login);
app.use(adminRouter);
app.use(forgotPassword);
app.use(resetPassword);
app.use(updatePasswordViaEmail);
app.use(tariffRouter);
app.use(paymentRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '../client/build/index.html'));
// });

// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

module.exports = app;
