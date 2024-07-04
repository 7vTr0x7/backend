const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");

const Books = require("./models/books.models");

const jsonData = fs.readFileSync("BE1.2_HW2/booksData.json");
const booksData = JSON.parse(jsonData);

const seedData = () => {
  try {
    for (const book of booksData) {
      const newBook = new Books({
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genre: book.genre,
        language: book.language,
        country: book.country,
        rating: book.rating,
        summary: book.summary,
        coverImageUrl: book.coverImageUrl,
      });

      newBook.save();
      console.log("Book Data:", newBook.title);
    }
  } catch (error) {
    console.log("Error seeding data", error);
  }
};

seedData();
