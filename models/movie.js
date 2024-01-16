const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  year: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    lowercase: true,
  },
  lore: {
    type: String,
  },
  image: {
    type: String,
  },
});

const movie = mongoose.model("Movie", movieSchema);
module.exports = movie;
