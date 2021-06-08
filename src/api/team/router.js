const express = require('express');

const router = express.Router();

const {
  getTeams,
  addTeam,
  getTeamByName,
  getTeamByusername,
  // delUser,
  // getUsers,
} = require('./controller');

router.route('/').get(getTeams).post(addTeam);

router.route('/:teamName').get(getTeamByName);

router.route('/user/:username').get(getTeamByusername);

//router.route('/:id').get(getUser).patch(updateUser).delete(delUser);

module.exports = router;
