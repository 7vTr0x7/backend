const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Movie = require("./models/movies.models");

const app = express();

app.use(express.json());

initializeDatabase();

const createMovie = async (movie) => {
  try {
    const newMovie = new Movie(movie);
    const savedMovie = await newMovie.save();
    return savedMovie;
  } catch (error) {
    throw error;
  }
};

app.post("/movies", async (req, res) => {
  try {
    const savedMovie = await createMovie(req.body);
    if (savedMovie) {
      res.status(201).json({ message: "Movie saved", movie: savedMovie });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add movie" });
  }
});

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

const readMoviesByGenre = async (genreName) => {
  try {
    const moviesByGenre = await Movie.find({ genre: genreName });
    return moviesByGenre;
  } catch (error) {
    throw error;
  }
};

app.get("/movies/genres/:genreName", async (req, res) => {
  try {
    const movies = await readMoviesByGenre(req.params.genreName);
    if (movies.length > 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "Movies not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

const deleteMovieById = async (movieId) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    return deletedMovie;
  } catch (error) {
    throw error;
  }
};

app.delete("/movies/:id", async (req, res) => {
  try {
    const deletedMovie = await deleteMovieById(req.params.id);
    res.status(201).json({ message: "Movie Deleted", movie: deletedMovie });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

const updateMovies = async (movieId, dataToUpdate) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {
      new: true,
    });
    return updatedMovie;
  } catch (error) {
    throw error;
  }
};

app.post("movies/:movieId", async (req, res) => {
  try {
    const updatedMovie = await updateMovies(req.params.movieId, req.body);
    res
      .status(201)
      .json({ message: "updated successfully", movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ error: "failed to update" });
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
