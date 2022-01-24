import request from "supertest";
import { app } from "../../src/app";

const REGISTER_API = "/api/auth/register";

describe("GET /api/users/ambassadors/list", () => {
  
  it("Should not return 404 if the routes exists", async () => {
    const response = await request(app).post(REGISTER_API).send({});
    expect(response.statusCode).not.toBe(404);
  });
 

});

