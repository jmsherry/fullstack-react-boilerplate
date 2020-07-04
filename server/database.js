const mongoose = require("mongoose");

// TODO! change localDBName name to match your local db!!
const localDBName = "crae";
const { MONGODB_URI = `mongodb://localhost/${localDBName}` } = process.env;

const promise = mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    console.log("DATABASE CONNECTED!!");
  })
  .catch(function (err) {
    console.log("CONNECTION ERROR", err);
  });
