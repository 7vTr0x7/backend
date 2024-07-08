const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, This is Express Assignment Server.");
});

const albums = [
  { id: 1, title: "Abbey Road", artist: "The Beatles", year: 1969 },

  {
    id: 2,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
  },

  { id: 3, title: "Thriller", artist: "Michael Jackson", year: 1982 },
];

app.get("/albums", (req, res) => {
  res.send(albums);
});

app.post("/albums", (req, res) => {
  const newAlbum = req.body;
  if (newAlbum.title && newAlbum.artist && newAlbum.year) {
    albums.push(newAlbum);
    res
      .status(200)
      .json({ message: "Album Added successfully", album: newAlbum });
  } else {
    res.status(400).json({ error: "title, artist and year required" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
