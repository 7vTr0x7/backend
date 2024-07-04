const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Movie = require("./models/movies.models");

initializeDatabase();

const newMovie = {
  title: "New Movie",
  releaseYear: 2023,
  genre: ["Drama"],
  director: "Aditya Roy Chopra",
  actors: ["Actor1", "Actor2"],
  language: "Hindi",
  country: "India",
  rating: 6.1,
  plot: "A young man and woman fall in love on a Australia trip.",
  awards: "IFA Filmfare Awards",
  posterUrl: "https://example.com/new-poster1.jpg",
  trailerUrl: "https://example.com/new-trailer1.mp4",
};

const createMovie = async (movie) => {
  try {
    const newMovie = new Movie(movie);
    const savedMovie = await newMovie.save();
    console.log("Movie:", savedMovie);
  } catch (error) {
    throw error;
  }
};

createMovie(newMovie);
