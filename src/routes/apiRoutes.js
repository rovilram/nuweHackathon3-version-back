const express = require('express');



const userRouter = require('../api/user/router');
const repoRouter = require('../api/repo/router');

const errorMiddleware = require('../middlewares/errorMiddleware');

const router = express.Router();

router.use('/user', userRouter);

router.use('/repo', repoRouter);

module.exports = router;
