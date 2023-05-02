import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { AccountController } from '../../src/account/interface/account.controller';
import request from 'supertest';
import { Server } from '../../src/common/framework/server';
import { DataSource } from '../../src/common/database/database';
import { json, urlencoded } from 'express';
import { PostController } from '../../src/post/interface/post.controller';
import { Post } from '../../src/post/domain/post';
import { UserId } from '../../src/post/domain/user-id';

describe('PostController (e2e)', () => {
  let app: Express.Application;

  beforeEach(() => {
    const server = new Server([json(), urlencoded({ extended: true })]);
    server.injectController([AccountController, PostController]);
    app = server.app;
  });

  afterAll(() => {
    new DataSource().removePool();
  });

  describe('/post', () => {
    let authorEmail: string;
    let authorPassword: string;
    let authorId: string;

    beforeEach(async () => {
      authorEmail = faker.internet.email();
      authorPassword = faker.internet.password();

      await request(app).post('/account/register').send({
        email: authorEmail,
        password: authorPassword,
        name: faker.name.fullName(),
      });

      const author = await request(app).get(`/account/${authorEmail}`);
      authorId = author.body.id;
    });

    it('when 정상적인 데이터 should 성공', async () => {
      // when
      await request(app)
        .post('/post')
        .send({
          authorId,
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
        })
        .expect(200);

      // then
      return request(app).get(`/post/user/${authorId}`).expect(200);
    });
  });

  describe('/post/like', () => {
    let authorEmail: string;
    let authorPassword: string;
    let authorId: string;
    let postId: number;

    const title = faker.lorem.sentence();
    const content = faker.lorem.paragraph();

    beforeEach(async () => {
      authorEmail = faker.internet.email();
      authorPassword = faker.internet.password();

      await request(app).post('/account/register').send({
        email: authorEmail,
        password: authorPassword,
        name: faker.name.fullName(),
      });

      const author = await request(app).get(`/account/${authorEmail}`);
      authorId = author.body.id;

      await request(app)
        .post('/post')
        .send({
          authorId,
          title,
          content,
        })
        .expect(200);
      const post = await request(app).get(`/post/user/${authorId}`).expect(200);
      postId = post.body[0].id;
    });

    it('when 정상적인 데이터 should 성공', async () => {
      return request(app)
        .patch('/post/like')
        .send({
          userId: authorId,
          postId,
        })
        .expect(200);
    });
  });

  describe('/post/dislike', () => {
    let authorEmail: string;
    let authorPassword: string;
    let authorId: string;
    let postId: number;

    const title = faker.lorem.sentence();
    const content = faker.lorem.paragraph();

    beforeEach(async () => {
      authorEmail = faker.internet.email();
      authorPassword = faker.internet.password();

      await request(app).post('/account/register').send({
        email: authorEmail,
        password: authorPassword,
        name: faker.name.fullName(),
      });

      const author = await request(app).get(`/account/${authorEmail}`);
      authorId = author.body.id;

      await request(app)
        .post('/post')
        .send({
          authorId,
          title,
          content,
        })
        .expect(200);
      const post = await request(app).get(`/post/user/${authorId}`).expect(200);
      postId = post.body[0].id;
    });

    it('when 정상적인 데이터 should 성공', async () => {
      await request(app).patch('/post/like').send({
        userId: authorId,
        postId,
      });
      return request(app)
        .patch('/post/dislike')
        .send({
          userId: authorId,
          postId,
        })
        .expect(200);
    });
  });
});
