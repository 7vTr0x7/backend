const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express server.");
});

const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },

  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
  },
];

app.post("/movies", (req, res) => {
  const newMovie = req.body;

  if (newMovie.title && newMovie.director && newMovie.year) {
    movies.push(newMovie);
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } else {
    res.status(400).json({ error: "Title, Director and Year are required" });
  }
});

app.get("/movies", (req, res) => {
  res.send(movies);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on post: ${PORT}`);
});
