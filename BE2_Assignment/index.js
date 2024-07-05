const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Cars = require("./models/cars.models");

initializeDatabase();
