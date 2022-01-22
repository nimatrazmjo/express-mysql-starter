import request from "supertest";
import { UserMock } from "../mocks/user.mock";

import { app } from "../../src/app";

const REGISTER_API = "/api/auth/register";
const LOGIN_API = '/api/auth/login'

describe("POST /api/auth/register", () => {
  
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

describe("POST /api/auth/login", () => {
  
  
  it("should return 422 if email or password does not provided", async () => {
    const { email, password } = UserMock;
    const res = await request(app)
      .post(LOGIN_API)
      .send({})
      .expect(422);
  });
  it("should return 422 if provided emails is invalid", async() => {
    await request(app)
      .post(LOGIN_API)
      .send({email: 'invalid email', password: 'tererere'})
      .expect(422);

    
  });
  it("should return 400 if email does not exists", async () => {
    await request(app)
      .post(REGISTER_API)
      .send(UserMock)
      .expect(201);
    
    await request(app)
      .post(LOGIN_API)
      .send({email: 'worngemail@gmail.com', password: 'tererere'})
      .expect(400);
  });
  it("should return 400 if password does not match", async () => {
    const {email} = UserMock
    await request(app)
      .post(REGISTER_API)
      .send(UserMock)
      .expect(201);
    
    await request(app)
      .post(LOGIN_API)
      .send({email, password: 'tererere'})
      .expect(400);
  });
  it("should return 200 if user provided a valid credentials", async () => {
    const {email, password} = UserMock
    await request(app)
      .post(REGISTER_API)
      .send(UserMock)
      .expect(201);

      await request(app)
      .post(LOGIN_API)
      .send({email, password})
      .expect(200);
  });
});

