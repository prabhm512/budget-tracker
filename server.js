require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 5000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// MongoDB Atlas connection
const PWD = process.env.MONGO_PWD;

const databaseURL = `mongodb+srv://prabhm512:${PWD}@cluster0.ltepl.mongodb.net/budget`;

mongoose.connect(process.env.MONGODB_URI || databaseURL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});