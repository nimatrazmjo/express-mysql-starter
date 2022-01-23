import request from 'supertest';
import { app } from '../../src/app';
import { UserMock } from '../mocks/user.mock';

async function signUpAndReturnCookie():Promise<string[]> {
  const {email, password} = UserMock;
  await request(app)
    .post('/api/auth/register')
    .send(UserMock)
    .expect(201);

  const response = await request(app)
    .post('/api/auth/login')
    .send({email, password})
    .expect(200);
    
    return response.get('Set-Cookie');
}

export { signUpAndReturnCookie }