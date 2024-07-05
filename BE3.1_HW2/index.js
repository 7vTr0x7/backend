const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from express server.");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
