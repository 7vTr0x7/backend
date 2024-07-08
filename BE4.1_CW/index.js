const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Movie = require("./models/movies.models");

const app = express();

app.use(express.json());

initializeDatabase();

const readMovieByTitle = async (title) => {
  try {
    const movieByTitle = await Movie.findOne({ title: title });
    return movieByTitle;
  } catch (error) {
    throw error;
  }
};

app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await readMovieByTitle(req.params.title);
    if (movie) {
      res.json(movie);
    } else res.status(404).json({ error: "Movie not Found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

const readAllMovies = async () => {
  try {
    const allMovies = await Movie.find();
    return allMovies;
  } catch (error) {
    throw error;
  }
};

app.get("/movies", async (req, res) => {
  try {
    const movies = await readAllMovies();
    if (movies) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "Movies not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

const readMovieByDirector = async (director) => {
  try {
    const movieByDirector = await Movie.find({ director: director });
    return movieByDirector;
  } catch (error) {
    throw error;
  }
};

app.get("/movies/director/:directorName", async (req, res) => {
  try {
    const movie = await readMovieByDirector(req.params.directorName);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie By director not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie by director" });
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
