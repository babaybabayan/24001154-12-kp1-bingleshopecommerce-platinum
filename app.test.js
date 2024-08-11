const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

it("Call the /test endpoint", async () => {
  return request.get("/test").then(async (res) => {
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("This App is running properly!");
  });
});
