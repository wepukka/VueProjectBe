const Movie = require("../models/movie");

async function checkIfMovieExists(title) {
  let movie = await Movie.findOne({ title: title });

  return movie;
}

module.exports = {
  checkIfMovieExists,
};
