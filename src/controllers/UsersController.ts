import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepositories';

class UsersController {
  async create(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.create({
      name: 'João',
      email: 'joaobispo2077@gmail.com',
      password_hash: 'asdkjlfsd5sad4gfsad5g4ad65g4ad',
    });

    await usersRepository.save(user);
    return res.status(200).json(user);
  }
}

export default new UsersController();
