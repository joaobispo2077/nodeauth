import { Request, Response } from 'express';

class SessionController {
  async store(req: Request, res: Response) {
    return res.status(200).send();
  }
}

export default new SessionController();
