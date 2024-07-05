const express = require("express");

const app = express();
app.use(express.json());

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },

  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },

  { id: 3, title: "1984", author: "George Orwell", year: 1949 },
];

app.get("/", (req, res) => {
  res.send("Hello, From Express Server.");
});

app.post("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const updatedBookData = req.body;

  const bookToUpdate = books.find((book) => book.id === bookId);

  if (!bookToUpdate) {
    res.status(404).json({ error: "Book not Found" });
  } else {
    if (
      updatedBookData.title &&
      updatedBookData.author &&
      updatedBookData.year
    ) {
      Object.assign(bookToUpdate, updatedBookData);
    } else {
      res.status(400).json({ error: "Title, author and year are required" });
    }
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log("Server Running on port:", PORT);
});
