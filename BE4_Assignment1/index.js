const express = require("express");
const app = express();

app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const Books = require("./models/books.models");

initializeDatabase();

const createBook = async (book) => {
  try {
    const newBook = new Books(book);
    const savedBook = newBook.save();
    return savedBook;
  } catch (error) {
    throw error;
  }
};

app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    if (savedBook) {
      res.status(200).json({ message: "Created", book: savedBook });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
