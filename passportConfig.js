const Users = require('./src/api/user/model');
const SHA256 = require('crypto-js/sha256');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
       (username, password, done) => {
        Users.findOne({ username: username },async (err, user) => {
          console.log('user', user);
          const hashPass = SHA256(password).toString();
          if (err) throw err;
          if (!user) return done(null, false);
          console.log(hashPass, user.password);
          if (hashPass === user.password) return done(null, user);
          else return done(null, false);
        });
      },
    ),
  );

  passport.serializeUser((user, cb) => {
    console.log('serializando');
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    console.log('deserializando');
    Users.findOne({ id: id }, (err, user) => {
      console.log("deserializando", user)
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
