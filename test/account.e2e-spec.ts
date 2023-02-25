import 'reflect-metadata';
import { AccountController } from '../src/account/interface/account.controller';
import * as request from 'supertest';
import { Server } from '../src/common/server';
import { Connection } from '../src/common/database';
import { json, urlencoded } from 'express';

describe('AccountController (e2e)', () => {
  let app: Express.Application;

  beforeEach(() => {
    const server = new Server([json(), urlencoded({ extended: true })]);
    server.injectController([AccountController]);
    app = server.app;
  });

  afterAll(() => {
    Connection.end();
  });

  it('/register', () => {
    return request(app)
      .post('/account/register')
      .send({
        email: '!',
        password: '!!',
      })
      .expect({
        email: '!',
        password: '!!',
      });
  });

  it('/login', async () => {
    await request(app).post('/account/register').send({
      email: '!',
      password: '!!',
    });
    await request(app)
      .post('/account/login')
      .send({
        email: '!',
        password: '!!!',
      })
      .expect(404);
    return request(app)
      .post('/account/login')
      .send({
        email: '!',
        password: '!!',
      })
      .expect(200);
  });
});
