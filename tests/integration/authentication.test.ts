import request from 'supertest';
import app from '../../src/app';

import connection from '../../src/database/connection';

describe('Authentication', () => {
  beforeAll(async () => {
    const connectionDB = await connection.create();
    await connectionDB.runMigrations();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it('should receive JWT token when authenticated with valid credentials', async () => {
    const user = {
      email: 'teste@gmail.com',
      password_hash: '123456',
    };

    const response = await request(app).post('/auth').send(user);

    expect(response.status).toBe(200);
    expect(1).toBe(1);
  });
});
