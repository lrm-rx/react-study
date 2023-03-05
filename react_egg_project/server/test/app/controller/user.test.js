"use strict";

const { app } = require("egg-mock/bootstrap");
describe("user test", () => {
  it("user index", () => {
    return app.httpRequest().get("/user").expect(200).expect("user index");
  });

  it("user lists", async () => {
    await app
      .httpRequest()
      .get("/user/lists")
      .expect(200)
      .expect('[{"id":123}]');
  });

  it("user detail", async () => {
    await app.httpRequest().get("/user/detail/100").expect(200).expect("100");
  });

  it("user detail2", async () => {
    await app
      .httpRequest()
      .get("/user/detail2/?id=100")
      .expect(200)
      .expect("100");
  });

  it("user add post", async () => {
    await app
      .httpRequest()
      .post("/user/add")
      .send({
        id: 10,
        username: "lpl",
      })
      .expect(200)
      .expect({
        status: 200,
        data: {
          id: 10,
          username: "lpl",
        },
      });
  });
});
