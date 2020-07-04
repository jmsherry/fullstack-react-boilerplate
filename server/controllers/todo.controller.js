const Todo = require("../models/todo/todo.model");
const { errorHandler } = require("./utils");

exports.getTodos = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Todo.find(query).exec((err, todos) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(todos);
  });
};

exports.addTodo = function (req, res) {
  const todoData = req.body;
  console.log("todoData", todoData);
  console.log("req.files", req.files);
  todoData.photos = req.files.map((file) => {
    return {
      path: file.path,
      name: file.originalname,
    };
  });
  const newTodo = new Todo(todoData);
  newTodo.save((err, todo) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(todo);
  });
};

exports.addPhotos = function (req, res) {
  const query = {
    _id: req.params.id,
  };
  Todo.find(query).exec((err, result) => {
    if (err) return errorHandler(res, err);
    if (!result.length) return res.sendStatus(404);
    const todo = result[0];
    // console.log('todo', todo);
    // console.log('photos', todo.photos);
    console.log("files", req.files);
    todo.photos = [
      ...todo.photos,
      ...req.files.map((file) => {
        return {
          path: file.path,
          name: file.originalname,
        };
      }),
    ];
    todo.save((err, todo) => {
      if (err) return errorHandler(res, err);
      if (!todo) return res.sendStatus(404);
      return res.status(201).json(todo);
    });
  });
};

exports.updateTodo = function (req, res) {
  Todo.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) errorHandler(res, err);
    res.sendStatus(200);
  });
};

exports.removeTodo = function (req, res) {
  Todo.deleteOne({ _id: req.params.id }, function (err) {
    if (err) errorHandler(res, err);
    res.sendStatus(204);
  });
};
