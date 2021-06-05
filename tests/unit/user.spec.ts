import encrypt from '../../src/utils/encrypt';
import { IUser } from '../../src/interfaces/User';

describe('User', () => {
  it('should encrypt user password', async () => {
    const user: IUser = {
      email: 'test@example.com',
      name: 'test',
      password: '123456',
    };

    const password_hash = await encrypt.generateHash(user.password, 8);

    const isHashFromPassword = await encrypt.compareHash(
      user.password,
      password_hash,
    );

    expect(isHashFromPassword).toBe(true);
  });
});
