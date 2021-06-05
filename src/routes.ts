import { Router } from 'express';

import sessionController from './controllers/SessionController';
import usersController from './controllers/UsersController';
import { authMiddleware } from './middlewares/authentication';

const routes = Router();

routes.post('/auth', sessionController.store);
routes.post('/users', usersController.create);

routes.use(authMiddleware);
routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});

export default routes;
