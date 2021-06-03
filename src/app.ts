import * as dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
console.log('Enviroment...', process.env.NODE_ENV);

import express from 'express';
import routes from './routes';

import 'reflect-metadata';

import connection from './database/connection';
connection.create();
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
