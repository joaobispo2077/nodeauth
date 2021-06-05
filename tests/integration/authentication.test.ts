import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';
import connection from '../../src/database/connection';
import { IUser } from '../../src/interfaces/User';

const createMockUser = async (user?: Partial<IUser>) => {
  const userToCreate = {
    email: faker.internet.email(),
    name: faker.name.findName(),
    password: faker.internet.password(),
  };

  const response = await request(app).post('/users').send(userToCreate);

  const outputUser = Object.assign({}, userToCreate, user);

  return { raw: outputUser, fill: response.body };
};

describe('Authentication', () => {
  beforeAll(async () => {
    const connectionDB = await connection.create();
    await connectionDB.runMigrations();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(() => async () => {
    await connection.clear();
  });

  it('should receive JWT token when authenticated with valid credentials', async () => {
    const userMock = await createMockUser();
    const response = await request(app).post('/auth').send(userMock.raw);

    expect(response.headers).toHaveProperty('access-token');
  });

  it('should not authenticate with invalid credentials', async () => {
    const userMockWithInvalidPassword = await createMockUser({
      password: '00000000000000000',
    });

    const response = await request(app)
      .post('/auth')
      .send(userMockWithInvalidPassword.raw);

    expect(response.status).toBe(401);
  });

  it('should be able to access private routes when authenticated', async () => {
    const userMock = await createMockUser();

    const responseWithToken = await request(app)
      .post('/auth')
      .send(userMock.raw);

    const bearerToken = responseWithToken.headers['access-token'];

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${bearerToken}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to access private routes without jwt token', async () => {
    const userMock = await createMockUser();

    const responseWithToken = await request(app)
      .post('/auth')
      .send(userMock.raw);

    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('should not be able to access private routes with invalid jwt token', async () => {
    const userMock = await createMockUser();

    const responseWithToken = await request(app)
      .post('/auth')
      .send(userMock.raw);

    const bearerToken = responseWithToken.headers['access-token'];

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`);

    expect(response.status).toBe(401);
  });
});
