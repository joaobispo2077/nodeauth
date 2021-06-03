import express from 'express';
import routes from './routes';

import 'reflect-metadata';
import './database';
class AppController {
  public app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new AppController().app;
