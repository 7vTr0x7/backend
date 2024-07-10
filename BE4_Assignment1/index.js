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
    res.status(500).json({ error: `Failed to create book: ${error}` });
  }
});

const readAllBooks = async () => {
  try {
    const allBooks = await Books.find();
    return allBooks;
  } catch (error) {
    throw error;
  }
};

app.get("/books", async (req, res) => {
  try {
    const allBooks = await readAllBooks();
    if (allBooks.length > 0) {
      res.status(200).json({ message: "Books", books: allBooks });
    } else {
      res.status(404).json({ error: "Books not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get books" });
  }
});

const readBookByTitle = async (title) => {
  try {
    const bookByTitle = await Books.findOne({ title: title });
    return bookByTitle;
  } catch (error) {
    throw error;
  }
};

app.get("/books/:title", async (req, res) => {
  try {
    const book = await readBookByTitle(req.params.title);
    if (book) {
      res.status(200).json(book);
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get books by title ${error}` });
  }
});

const readBooksByAuthor = async (author) => {
  try {
    const booksByAuthor = await Books.find({ author: author });
    return booksByAuthor;
  } catch (error) {
    throw error;
  }
};

app.get("/books/authors/:authorName", async (req, res) => {
  try {
    const books = await readBooksByAuthor(req.params.authorName);
    if (books) {
      res.json(books);
    } else {
      res.status.json({ error: `Books not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get books by author ${error}` });
  }
});

const readBooksByGenre = async (genre) => {
  try {
    const booksByGenre = await Books.find({ genre: genre });
    return booksByGenre;
  } catch (error) {
    throw error;
  }
};

app.get("/books/genres/:genreName", async (req, res) => {
  try {
    const books = await readBooksByGenre(req.params.genreName);
    if (books.length > 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get books: ${error}` });
  }
});

const readBooksByYear = async (year) => {
  try {
    const books = await Books.find({ publishedYear: Number(year) });
    return books;
  } catch (error) {
    throw error;
  }
};

app.get("/books/release/:year", async (req, res) => {
  try {
    const books = await readBooksByYear(req.params.year);
    if (books.length > 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: "Books not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get books: ${error}` });
  }
});
const updateBookRating = async (bookId, dataToUpdate) => {
  try {
    const books = await Books.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return books;
  } catch (error) {
    console.log(error);
  }
};

app.post("/books/:bookId", async (req, res) => {
  try {
    const book = await updateBookRating(req.params.bookId, req.body);
    if (book) {
      res.json(book);
    } else {
      res.status(200).json({ error: "Failed to get Books" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get books ${error}` });
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
