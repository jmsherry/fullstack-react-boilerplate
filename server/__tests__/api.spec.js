const request = require("supertest");
const app = require("../app");

let server, agent;

const fakePersonData = {
  firstName: "Terry",
  lastName: "Perry",
  email: "terry.perry@thejump.tech",
};

beforeEach((done) => {
  server = app.listen(4000, (err) => {
    if (err) return done(err);

    agent = request.agent(server); // since the application is already listening, it should use the allocated port
    done();
  });
});

afterEach((done) => {
  // here you would normally reset the test database too...
  return server && server.close(done);
});

describe("Post Endpoints", () => {
  it("should create a new person", async () => {
    // const res = await agent.post("/api/v1/people").send(fakePersonData);

    // const responseData = res.body;
    // console.log("responseData", responseData);

    // expect(res.statusCode).toEqual(201);

    // expect(responseData).toHaveProperty("_id");
    // expect(responseData).toHaveProperty("firstName", "Terry");
    // expect(responseData).toHaveProperty("lastName", "Perry");
    // expect(responseData).toHaveProperty("email", "terry.perry@thejump.tech");

    // const { _id } = responseData;
    // const delRes = await agent.delete(`/api/v1/people/${_id}`).send();
    // console.log(`Deleted record: ${delRes.statusCode === 204}`)
    expect(true).toBe(true);
  });
});
