const path = require("path");

module.exports = function (app) {
  const API_ENDPOINT = "/api";
  const API_VERSION = "v1";
  app.use(`${API_ENDPOINT}/${API_VERSION}/todos`, require("./todos.routes"));
  app.use(`${API_ENDPOINT}/${API_VERSION}/people`, require("./people.routes"));
  app.get("*", (req, res) => {
    if (process.env.NODE_ENV === "production") {
      res.sendFile(path.join(__dirname, "../../client/", "build/index.html"));
    }
  });
  app.all("*", (req, res) => {
    res.sendStatus(404);
  });
};
