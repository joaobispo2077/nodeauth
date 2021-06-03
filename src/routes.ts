import { Router } from 'express';
import usersController from './controllers/UsersController';

const routes = Router();

routes.get('/users', usersController.create);

export default routes;
