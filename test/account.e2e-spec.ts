import 'reflect-metadata';
import { AccountController } from '../src/account/interface/account.controller';
import * as request from 'supertest';
import { Server } from '../src/common/server';

describe('AccountController (e2e)', () => {
  let app: Express.Application;

  beforeEach(() => {
    const server = new Server();
    server.injectController([AccountController]);
    app = server.app;
  });

  it('/register', () => {
    return request(app)
      .post('/account/register')
      .send({
        email: '',
        password: '',
      })
      .expect(200)
      .expect('Hello World!');
  });
});
