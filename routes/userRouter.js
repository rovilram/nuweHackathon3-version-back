const express = require('express');

const router = express.Router();
const {
  addUser,
  getUser,
  updateUser,
  delUser,
  getUsers,
} = require('../controllers/userController');

router.route('/').get(getUsers).post(addUser);

router.route('/:id').get(getUser).patch(updateUser).delete(delUser);

module.exports = router;
