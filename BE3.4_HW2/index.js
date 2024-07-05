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

app.get("/movies", (req, res) => {
  res.send(movies);
});

app.post("/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);
  const dataToUpdate = req.body;

  const itemToUpdate = movies.find((movie) => movie.id === movieId);

  if (!itemToUpdate) {
    res.status(404).json({ error: "Movie not Found" });
  } else {
    if (dataToUpdate.title && dataToUpdate.director && dataToUpdate.year) {
      Object.assign(itemToUpdate, dataToUpdate);
      res
        .status(200)
        .json({ message: "movie updated successfully", movie: itemToUpdate });
    } else {
      res.status(400).json({ error: "title, director and year are required" });
    }
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

app.post("/items/:id", (req, res) => {
  const itemId = Number(req.params.id);
  const updatedItemData = req.body;

  const itemToUpdate = items.find((item) => item.id === itemId);

  if (!itemToUpdate) {
    res.status(404).json({ error: "Movie not Found" });
  } else {
    if (
      updatedItemData.itemName &&
      updatedItemData.color &&
      updatedItemData.quantity
    ) {
      Object.assign(itemToUpdate, updatedItemData);
      res
        .status(200)
        .json({ message: "Item updated successfully", item: itemToUpdate });
    } else {
      res.status(400).json({ error: "itemName, color and " });
    }
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
