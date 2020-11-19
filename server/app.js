require("dotenv").config();
const express = require("express");
const app = express();
const {} = process.env;

console.log("test");

require("./database");
require("./middleware")(app);
require("./routes")(app);

module.exports = app;
