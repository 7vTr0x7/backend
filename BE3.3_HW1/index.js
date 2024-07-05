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
  res.send("Hello, Express server.");
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  if (newBook.title && newBook.author && newBook.year) {
    books.push(newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } else {
    res.status(400).json({ error: "title, author and year are required" });
  }
});

app.get("/books", (req, res) => {
  res.send(books);
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const index = books.findIndex((book) => book.id == bookId);
  if (index === -1) {
    res.status(404).json({ error: "Book not found" });
  } else {
    books.splice(index, 1);
    res.status(200).json({ message: "Book deleted successfully" });
  }
});

const todos = [
  { id: 1, title: "Water the plants", day: "Saturday" },

  { id: 2, title: "Go for a walk", day: "Sunday" },
];

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  if (newTodo.title && newTodo.day) {
    todos.push(newTodo);
    res.status(201).json({ message: "todo added successfully", todo: newTodo });
  } else {
    res.status(400).json({ error: "title and day are required" });
  }
});

app.get("/todos", (req, res) => {
  res.send(todos);
});

app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;

  const index = todos.findIndex((todo) => todo.id == todoId);

  if (index === -1) {
    res.status(404).json({ error: "Todo does not exist" });
  } else {
    todos.splice(index, 1);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on post: ${PORT}`);
});
