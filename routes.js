const { checkIfMovieExists } = require("./controllers/movieControllers");
const Movie = require("./models/movie");
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());

router.get("/", function (req, res) {
  res.json({ msg: "backend for vue project" });
});

// ADD MOVIE //
router.post("/add-movie", async function (req, res) {
  console.log(req.body);
  let movieIsAlready = await checkIfMovieExists(req.body.title);
  if (movieIsAlready) {
    return res.send({
      payload: {
        success: false,
        errorMsg: `Movie with the name ${req.body.title} already exists`,
      },
    });
  }

  const movie = new Movie(req.body);
  movie
    .save()
    .then((result) => {
      res.send({
        payload: {
          success: true,
          data: result,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        payload: {
          success: false,
          errorMsg: "Something went wrong!",
        },
      });
    });
});

// GET ALL MOVIES //
router.get("/all-movies", function (req, res) {
  Movie.find()
    .then((result) => {
      res.send({
        payload: {
          success: true,
          data: result,
        },
      });
    })
    .catch((err) => {
      res.send({
        payload: {
          success: false,
          errorMsg: "Something went wrong",
        },
      });
    });
});

// GET MOVIE BY ID  //
router.get("/movie/:id", function (req, res) {
  Movie.findOne({ _id: req.params.id })
    .then((result) => {
      res.send({
        payload: {
          success: true,
          data: result,
        },
      });
    })
    .catch((err) => {
      res.send({
        payload: {
          success: false,
          errorMsg: "Something went wrong",
        },
      });
    });
});

// GET MOVIES WITH FILTERS  //
router.get("/filter/", async function (req, res) {
  const filters = req.query;

  console.log(filters);

  const query = Movie.find();

  filters.title !== ""
    ? query.find({
        title: { $regex: filters.title.toLowerCase(), $options: "i" },
      })
    : null;
  filters.year !== ""
    ? query.find({ year: { $regex: filters.year, $options: "i" } })
    : null;
  filters.genre !== ""
    ? query.find({ genre: filters.genre.toLowerCase() })
    : null;

  const movies = await query.exec();

  movies.length === 0
    ? res.send({
        payload: {
          success: false,
          errorMsg: "No movies found with current filters!",
        },
      })
    : res.send({
        payload: {
          success: true,
          data: movies,
        },
      });
});

// DELETE MOVIE  //
// Switch from get to post or delete method //
router.post("/del-movie/", (req, res) => {
  const id = req.body.id;

  Movie.findByIdAndDelete(id)
    .then((result) => {
      console.log("MOVIE DELETED");
      res.send({
        payload: {
          success: true,
          data: result,
        },
      });
    })
    .catch((err) => {
      res.send({
        payload: {
          success: false,
          errorMsg: "Something went wrong",
        },
      });
    });
});

// UPDATE MOVIE //
router.post("/update/:id", (req, res) => {
  console.log(req.body);

  Movie.updateOne(
    { _id: req.body._id },
    {
      title: req.body.title,
      year: req.body.year,
      genre: req.body.genre,
      lore: req.body.lore,
      image: req.body.image,
    }
  )
    .then((result) => {
      res.send({
        payload: {
          success: true,
          data: result,
        },
      });
    })
    .catch((err) => {
      res.send({
        payload: {
          success: false,
          errorMsg: "Something went wrong",
        },
      });
    });
});

// TEST ADD //
router.get("/add-movie", function (req, res) {
  const movie = new Movie({
    title: "Interstellar",
    year: 2004,
    genre: "Sci-fi",
  });

  movie
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// TEST UPDATE //
router.get("/update-movie/:id", (req, res) => {
  const id = req.params.id;
  Movie.updateOne({ _id: id }, { title: "uugaBuuga" })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
