const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express server.");
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

app.delete("/movies/:id", (req, res) => {
  const movieId = req.params.id;

  const index = movies.findIndex((movie) => movieId == movie.id);

  if (index === -1) {
    res.status(404).json({ error: "Item not Found" });
  } else {
    movies.splice(index, 1);
    res.status(200).json({ message: "Item deleted successfully" });
  }
});

const items = [
  { id: 1, itemName: "Spoon", color: "Silver", quantity: 8 },

  { id: 2, itemName: "Fork", color: "Silver", quantity: 8 },

  { id: 3, itemName: "Plate", color: "Off-White", quantity: 6 },
];

app.get("/items", (req, res) => {
  res.send(items);
});

app.post("/items", (req, res) => {
  const newItem = req.body;

  if (newItem.itemName && newItem.color && newItem.quantity) {
    items.push(newItem);
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } else {
    res.status(400).json({ error: "Title, Color and Quantity are required" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on post: ${PORT}`);
});
