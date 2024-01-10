const Movie = require("./models/movie");
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());

router.get("/", function (req, res) {
  res.json({ msg: "backend for vue project" });
});

// ADD MOVIE //
router.post("/add-movie", function (req, res) {
  /*   console.log("body", req.body); */
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
      res.send({
        payload: {
          success: false,
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
        },
      });
    });
});

// DELETE MOVIE  //
// Switch from get to post or delete method //
router.get("/del-movie/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Movie.findByIdAndDelete(id)
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
        },
      });
    });
});

// UPDATE MOVIE //
router.post("/update-movie/:id", (req, res) => {
  const updatedMovie = req.body;
  Movie.updateOne({ _id: req.body.id }, { updatedMovie })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
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
