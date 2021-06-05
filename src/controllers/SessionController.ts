import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UsersService from '../services/UsersService';

class SessionController {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const usersService = new UsersService();

    const user = await usersService.getByEmail(email);

    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isValidPassword = await usersService.checkPassword(password, user);

    if (!isValidPassword)
      return res.status(401).json({ message: 'UNAUTHORIZED.' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    res.setHeader('token', token);
    return res.status(200).send();
  }
}

export default new SessionController();
