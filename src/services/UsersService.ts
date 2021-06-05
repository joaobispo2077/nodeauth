import bcrypt from 'bcrypt';
import { getCustomRepository, Repository } from 'typeorm';

import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepositories';

interface IUser {
  name: string;
  email: string;
  password: string;
}

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async generateUserPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 8);
    return hash;
  }

  async create(user: IUser): Promise<User> {
    const userCreated = this.usersRepository.create(user);

    return userCreated;
  }
}

export default UsersService;
