const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

module.exports = function (app) {
  // In dev mode, react-server serves the files BUT in production we BUILD the react project and express serves it out of the build folder
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/", "build")));
    app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname, "../client/", "build", "index.html"));
    });
  }

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // parse application/json
  app.use(express.json());

  // Helmet for security
  app.use(helmet());
  // CORS to make our API public
  app.use(cors());
};
