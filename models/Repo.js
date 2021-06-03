const mongoose = require('../database/mongoose');
const { nanoid } = require('nanoid');



const repoSchema = new mongoose.Schema({
  id: {
    type: String,
    default: nanoid,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  description: { type: String},
  stack: { type: Array, default: []},
});


const Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;
