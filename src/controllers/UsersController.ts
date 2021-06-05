import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

class UsersController {
  async create(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const user = {
      email,
      name,
      password,
    };

    const usersService = new UsersService();

    const userCreated = await usersService.create(user);

    return res.status(200).json(userCreated);
  }
}

export default new UsersController();
