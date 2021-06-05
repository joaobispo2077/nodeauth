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

    expect(response.headers).toHaveProperty('token');
  });

  it('should not authenticate with invalid credentials', async () => {
    const userMockWithInvalidPassword = await createMockUser({
      password: '00000000000000000',
    });

    const response = await request(app)
      .post('/auth')
      .send(userMockWithInvalidPassword.raw);

    expect(response.status).toBe(401);
    expect(1).toBe(1);
  });
});
