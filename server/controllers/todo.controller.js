const Todo = require("../models/todo/todo.model");
const { errorHandler } = require("./utils");

exports.getTodos = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Todo.find(query).populate('owner').exec((err, todos) => {
    if (err) return errorHandler(res, err);
    return res.status(200).json(todos);
  });
};

exports.addTodo = function (req, res) {
  const todoData = req.body;
  console.log("todoData", todoData);
  const newTodo = new Todo(todoData);
  newTodo.save((err, todo) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(todo);
  });
};

exports.updateTodo = function (req, res) {
  Todo.updateOne({ _id: req.params.id }, req.body, function (err) {
    if (err) return errorHandler(res, err);
    res.sendStatus(200);
  });
};

exports.removeTodo = function (req, res) {
  Todo.deleteOne({ _id: req.params.id }, function (err) {
    if (err) return errorHandler(res, err);
    res.sendStatus(204);
  });
};
