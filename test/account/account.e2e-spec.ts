import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { AccountController } from '../../src/account/interface/account.controller';
import request from 'supertest';
import { Server } from '../../src/common/framework/server';
import { DataSource } from '../../src/common/database/database';
import { json, urlencoded } from 'express';
import { PostController } from '../../src/post/interface/post.controller';

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
          email: faker.internet.email(),
          password: faker.internet.password(),
          name: faker.name.fullName(),
        })
        .expect(200);
    });

    it('when 잘못된 이메일로 요청 should 실패', () => {
      return request(app)
        .post('/account/register')
        .send({
          email: faker.datatype.string(),
          password: faker.internet.password(),
          name: faker.name.fullName(),
        })
        .expect(400);
    });
  });

  describe('/login', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    beforeAll(async () => {
      await request(app).post('/account/register').send({
        email,
        password,
        name: faker.name.fullName(),
      });
    });

    it('when 잘못된 데이터 should 실패', async () => {
      return await request(app)
        .post('/account/login')
        .send({
          email,
          password: faker.internet.password(),
        })
        .expect(404);
    });

    it('when 정상적인 데이터 should 성공', async () => {
      return request(app)
        .post('/account/login')
        .send({
          email,
          password,
        })
        .expect(200);
    });
  });

  describe('/follow', () => {
    let followerEmail: string;
    let followerPassword: string;
    let followingEmail: string;
    let followingPassword: string;

    beforeEach(async () => {
      followerEmail = faker.internet.email();
      followerPassword = faker.internet.password();
      followingEmail = faker.internet.email();
      followingPassword = faker.internet.password();

      await request(app).post('/account/register').send({
        email: followerEmail,
        password: followerPassword,
        name: 'name',
      });
      await request(app).post('/account/register').send({
        email: followingEmail,
        password: followingPassword,
        name: 'name',
      });
    });

    it('when 팔로우 안 된 계정 should 성공', async () => {
      // when
      const following = await request(app).get(`/account/${followingEmail}`);
      const follower = await request(app).get(`/account/${followerEmail}`);

      return request(app)
        .patch('/account/follow')
        .send({
          following: following.body.id,
          follower: follower.body.id,
        })
        .expect(200);
    });

    it('when 팔로우 된 계정 should 실패', async () => {
      // when
      const following = await request(app).get(`/account/${followingEmail}`);
      const follower = await request(app).get(`/account/${followerEmail}`);

      // given
      await request(app).patch('/account/follow').send({
        following: following.body.id,
        follower: follower.body.id,
      });

      // then
      return request(app)
        .patch('/account/follow')
        .send({
          following: following.body.id,
          follower: follower.body.id,
        })
        .expect(400);
    });
  });

  describe('/unfollow', () => {
    let followerEmail: string;
    let followerPassword: string;
    let followingEmail: string;
    let followingPassword: string;

    beforeEach(async () => {
      followerEmail = faker.internet.email();
      followerPassword = faker.internet.password();
      followingEmail = faker.internet.email();
      followingPassword = faker.internet.password();

      await request(app).post('/account/register').send({
        email: followerEmail,
        password: followerPassword,
        name: 'name',
      });
      await request(app).post('/account/register').send({
        email: followingEmail,
        password: followingPassword,
        name: 'name',
      });
    });

    it('when 팔로우 된 계정 should 성공', async () => {
      // when
      const following = await request(app).get(`/account/${followingEmail}`);
      const follower = await request(app).get(`/account/${followerEmail}`);

      // given
      await request(app).patch('/account/follow').send({
        following: following.body.id,
        follower: follower.body.id,
      });
      await request(app).patch('/account/follow').send({
        following: following.body.id,
        follower: follower.body.id,
      });
      await request(app).patch('/account/follow').send({
        following: following.body.id,
        follower: follower.body.id,
      });
      await request(app).patch('/account/follow').send({
        following: following.body.id,
        follower: follower.body.id,
      });

      return request(app)
        .patch('/account/unfollow')
        .send({
          following: following.body.id,
          follower: follower.body.id,
        })
        .expect(200);
    });

    it('when 팔로우 안 된 계정 should 실패', async () => {
      // when
      const following = await request(app).get(`/account/${followingEmail}`);
      const follower = await request(app).get(`/account/${followerEmail}`);

      // then
      return request(app)
        .patch('/account/unfollow')
        .send({
          following: following.body.id,
          follower: follower.body.id,
        })
        .expect(400);
    });
  });
});
