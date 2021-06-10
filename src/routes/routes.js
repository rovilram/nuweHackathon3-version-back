const Router = require('express');
const passport = require('passport');
const { addUser } = require('../api/user/controller');

const router = Router();

// test endpoint
router.get('/', (req, res) => {
  res.send("Hello World! I'm a API server");
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user)
      next({
        OK: 0,
        status: 403,
        message: 'Usuario / contraseña incorrectos',
      });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ OK: 1, message: 'Usuario logeado' });
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post('/register', addUser);

module.exports = router;
