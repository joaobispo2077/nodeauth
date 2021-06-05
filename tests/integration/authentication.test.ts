import request from 'supertest';
import app from '../../src/app';

import connection from '../../src/database/connection';

const createMockUser = async () => {
  const userToCreate = {
    email: 'test@gmail.com',
    name: 'Testing',
    password: '123456',
  };

  const response = await request(app).post('/users').send(userToCreate);
  return response.body;
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
    const user = {
      email: 'test@gmail.com',
      password: '123456',
    };

    const response = await request(app).post('/auth').send(user);

    expect(response.status).toBe(200);
    expect(1).toBe(1);
  });

  it('should not authenticate with invalid credentials', async () => {
    const userMock = await createMockUser();

    const userMockWithInvalidPassword = Object.assign({}, userMock, {
      password: '00000000000000000',
    });

    console.log(userMockWithInvalidPassword);

    const response = await request(app)
      .post('/auth')
      .send(userMockWithInvalidPassword);

    expect(response.status).toBe(401);
    expect(1).toBe(1);
  });
});
