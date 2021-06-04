'use Strict';

const express = require('express');
require('dotenv').config();

const userRouter = require('./src/api/user/router');
const repoRouter = require('./src/api/repo/router');

const errorMiddleware = require('./src/middlewares/errorMiddleware');

const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

const PORT = process.env.PORT || 3000;

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(
  cors({
    origin: 'http://localhost:3000', // <-- location of the react app were connecting to
    credentials: true,
  }),
);

const secretKey = process.env.SECRET_KEY || 'secretoAutenticacionNuwe';

server.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
  }),
);
server.use(cookieParser(secretKey));
server.use(passport.initialize());
server.use(passport.session());
require('./passportConfig')(passport);

// test endpoint
server.get('/', (req, res) => {
  res.send("Hello World! I'm a API server");
});

server.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No User Exists');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send('Successfully Authenticated');
        console.log(req.user);
      });
    }
  })(req, res, next);
});


server.use('/user', (req, res, next) => {
  if (req.isAuthenticated()) next()
  else next({
    status: 404,
    message: "no estás logeado"
  })
},userRouter, errorMiddleware);

server.use('/repo', repoRouter, errorMiddleware);

server.listen(PORT, () => {
  console.log(`API server running at heroku at port ${PORT}`);
});
