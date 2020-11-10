module.exports = function (app) {
  const API_ENDPOINT = '/api'
  const API_VERSION = 'v1'
  app.use(`${API_ENDPOINT}/${API_VERSION}/todos`, require("./todos.routes"));
  app.use(`${API_ENDPOINT}/${API_VERSION}/people`, require("./people.routes"));
};

// api/v1/people
