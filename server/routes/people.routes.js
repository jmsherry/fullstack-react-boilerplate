const path = require("path");
const express = require("express");
const router = express.Router();
const {
  getPeople,
  addPerson,
  updatePerson,
  removePerson,
} = require("../controllers/person.controller.js");

router
  .get("/:id?", getPeople)
  .post("/", addPerson)
  .put("/:id", updatePerson)
  .delete("/:id", removePerson);

module.exports = router;
