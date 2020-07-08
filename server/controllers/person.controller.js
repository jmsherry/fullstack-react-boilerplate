const Person = require("../models/person/person.model");
const { errorHandler } = require("./utils");

exports.getPeople = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Person.find(query).exec((err, people) => {
    if (err) return errorHandler(res, err);
    return res.status(200).json(people);
  });
};

exports.addPerson = function (req, res) {
  const personData = req.body;
  console.log("personData", personData);
  const newPerson = new Person(personData);
  newPerson.save((err, person) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(person);
  });
};


exports.updatePerson = function (req, res) {
  Person.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) errorHandler(res, err);
    res.sendStatus(200);
  });
};

exports.removePerson = function (req, res) {
  Person.deleteOne({ _id: req.params.id }, function (err) {
    if (err) errorHandler(res, err);
    res.sendStatus(204);
  });
};
