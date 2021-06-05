import { getCustomRepository, Repository } from 'typeorm';

import User from '../entities/User';
import { IUser } from '../interfaces/User';
import UsersRepository from '../repositories/UsersRepositories';
import encrypt from '../utils/encrypt';

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({ email, name, password }: IUser): Promise<User> {
    const password_hash = await encrypt.generateHash(String(password), 8);

    const user = {
      email,
      name,
      password_hash,
    };

    const userCreated = await this.usersRepository.create(user);
    await this.usersRepository.save(userCreated);

    return userCreated;
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    console.info('user', user);

    return user;
  }

  async checkPassword(password: string, user: User): Promise<boolean> {
    return await encrypt.compareHash(password, user.password_hash);
  }
}

export default UsersService;
