'use Strict';

const express = require('express');
require('dotenv').config();

const routes = require('./routes/routes');
const apiRoutes = require('./routes/apiRoutes');

const passport = require('./app/passport');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // <-- location of the react app were connecting to
    credentials: true,
  }),
);
app.use(helmet());

const secretKey = process.env.SECRET_KEY || 'secretoAutenticacionNuwe';
app.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, // cookie expirate time 1 hour
  }),
);
app.use(cookieParser(secretKey));

app.use(passport.initialize());
app.use(passport.session());

// endpoints

app.use('/', routes);
app.use(
  '/api',
  (req, res, next) => {
    if (req.isAuthenticated()) next();
    else
      next({
        status: 404,
        message: 'no estás logeado',
      });
  },
  apiRoutes,
  errorMiddleware,
);

module.exports = app;
