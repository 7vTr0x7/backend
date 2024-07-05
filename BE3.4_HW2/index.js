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

  {
    id: 3,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
  },
];

app.post("/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const dataToUpdate = req.body;

  const movieToUpdate = movies.find((movie) => movie.id === movieId);

  if (!movieToUpdate) {
    res.status(404).json({ error: "Movie not Found" });
  } else {
    if (dataToUpdate.title && dataToUpdate.director && dataToUpdate.year) {
      Object.assign(movieToUpdate, dataToUpdate);
      res
        .status(200)
        .json({ message: "movie updated successfully", movie: movieToUpdate });
    } else {
      res.status(400).json({ error: "title, director and year are required" });
    }
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
