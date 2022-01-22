import request from "supertest";
import { UserMock } from "../mocks/user.mock";

import { app } from "../../src/app";

describe("POST /api/auth/register", () => {
  const REGISTER_API = "/api/auth/register";
  it("Should not return 404 if the routes exists", async () => {
    const response = await request(app).post(REGISTER_API).send({});
    expect(response.statusCode).not.toBe(404);
  });
  it("Should return 422 if any fields are missing", async () => {
    const response = await request(app).post(REGISTER_API).send({}).expect(422);
  });
  it("Should return 400 if invalid email provide", async () => {
    const userMock = {... UserMock, email : 'test'};
    const response = await request(app)
      .post(REGISTER_API)
      .send(userMock)
      .expect(422);
    expect(response.body[0].field).toBe('email')
    expect(response.body[0].message).toBe('Email must be valid');
  });

  it("Should not return 422 if provided email already exists", async () => {
    const userMock = { ...UserMock} 
    await request(app)
    .post(REGISTER_API)
    .send(userMock)
    .expect(201);

    const response = await request(app)
    .post(REGISTER_API)
    .send(userMock)
    .expect(422);
  });
  it("Should  return 201 if the user successfully created", async () => {
    const response = await request(app)
    .post(REGISTER_API)
    .send(UserMock)
    .expect(201);
  });
});
