import supertest from "supertest";

import app from "../../src/app";

describe("API tests", () => {
  describe("when requesting /api/whoami", () => {
    it("should have CORS enabled", async () => {
      const response = await supertest(app).get("/api/whoami");

      expect(Object.keys(response.headers)).toContain(
        "access-control-allow-origin"
      );
    });

    it("should return JSON with headers information", async () => {
      const response = await supertest(app)
        .get("/api/whoami")
        .set("Accept-Language", "en-US,en;q=0.5")
        .set(
          "User-Agent",
          "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0"
        );

      expect(response.body).toMatchObject({
        ipaddress: expect.any(String),
        language: expect.any(String),
        software: expect.any(String),
      });
    });

    it("should respond with status code 200", async () => {
      const response = await supertest(app)
        .get("/api/whoami")
        .set("Accept-Language", "en-US,en;q=0.5")
        .set(
          "User-Agent",
          "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0"
        );

      expect(response.statusCode).toBe(200);
    });
  });
});
