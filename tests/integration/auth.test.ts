import request from "supertest";
import { UserMock } from "../mocks/user.mock";

import { app } from "../../src/app";
import { signUpAndReturnCookie } from "../unit/get-auth-cookie";

const REGISTER_API = "/api/auth/register";
const LOGIN_API = '/api/auth/login';
const CURRENT_USER_API = '/api/auth/current-user';
const LOGOUT_API = '/api/auth/logout';

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

      const response = await request(app)
      .post(LOGIN_API)
      .send({email, password})
      .expect(200);    
  });
});

describe('GET /api/auth/current-user',()=>{
  it('should response with details about the current user', async ()=>{
      const cookie = await signUpAndReturnCookie();
      const response = await request(app)
        .get(CURRENT_USER_API)
        .set('Cookie', cookie)
        .expect(200);
        
      expect(response.body.currentUser.email).toEqual(UserMock.email)
  });

  it('should return null for un authenticated user',async () => {
    const response = await request(app)
      .get(CURRENT_USER_API)
      .send({})
      .expect(401);

      expect(response.body.currentUser).toBe(undefined);
  });
});

describe(" POST /api/auth/logout", () => {
  const { email, password } = UserMock;
  it('should delete jwt from session',async () => {
    await request(app)
      .post(REGISTER_API)
      .send(UserMock).expect(201);
  
    await request(app)
      .post(LOGIN_API)
      .send({email, password}).expect(200);
  
    const response = await request(app)
      .post(LOGOUT_API)
      .send({})
      .expect(200)

    // expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
  });

});

