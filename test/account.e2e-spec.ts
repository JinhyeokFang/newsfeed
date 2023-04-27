import 'reflect-metadata';
import { AccountController } from '../src/account/interface/account.controller';
import request from 'supertest';
import { Server } from '../src/common/framework/server';
import { DataSource } from '../src/common/database/database';
import { json, urlencoded } from 'express';
import { PostController } from '../src/post/interface/post.controller';

describe('AccountController (e2e)', () => {
  let app: Express.Application;

  beforeEach(() => {
    const server = new Server([json(), urlencoded({ extended: true })]);
    server.injectController([AccountController, PostController]);
    app = server.app;
  });

  afterAll(() => {
    new DataSource().removePool();
  });

  describe('/register', () => {
    it('when 정상적으로 요청 should 성공', () => {
      return request(app)
        .post('/account/register')
        .send({
          email: 'abc@abc.com',
          password: '!!',
          name: 'name',
        })
        .expect(200);
    });

    it('when 잘못된 이메일로 요청 should 실패', () => {
      return request(app)
        .post('/account/register')
        .send({
          email: 'not email',
          password: '!!',
          name: 'name',
        })
        .expect(400);
    });
  });

  describe('/login', () => {
    beforeAll(async () => {
      await request(app).post('/account/register').send({
        email: 'abc@abc.com',
        password: '!!',
        name: 'name',
      });
    });

    it('when 잘못된 데이터 should 성공', async () => {
      return await request(app)
        .post('/account/login')
        .send({
          email: 'abc@abc.com',
          password: '!!!',
        })
        .expect(404);
    });

    it('when 정상적인 데이터 should 성공', async () => {
      return request(app)
        .post('/account/login')
        .send({
          email: 'abc@abc.com',
          password: '!!',
        })
        .expect(200);
    });
  });

  describe('/follow', () => {
    beforeAll(async () => {
      await request(app).post('/account/register').send({
        email: 'follower@abc.com',
        password: '!!',
        name: 'name',
      });
      await request(app).post('/account/register').send({
        email: 'following@abc.com',
        password: '!!',
        name: 'name',
      });
    });

    it('when 팔로우 안 된 계정 should 성공', async () => {
      // when
      const following = await request(app).get('/account/following@abc.com');
      const follower = await request(app).get('/account/follower@abc.com');

      return request(app)
        .patch('/account/follow')
        .send({
          following: following.body.data.id.stringifiedId,
          follower: follower.body.data.id.stringifiedId,
        })
        .expect(200);
    });

    it('when 팔로우 된 계정 should 실패', async () => {
      // when
      const following = await request(app).get('/account/following@abc.com');
      const follower = await request(app).get('/account/follower@abc.com');

      // given
      await request(app).patch('/account/follow').send({
        following: following.body.data.id.stringifiedId,
        follower: follower.body.data.id.stringifiedId,
      });

      // then
      return request(app)
        .patch('/account/follow')
        .send({
          following: following.body.data.id.stringifiedId,
          follower: follower.body.data.id.stringifiedId,
        })
        .expect(403);
    });
  });
});
