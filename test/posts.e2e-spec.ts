import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { user } from './helpers';

describe('posts controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let currentUserAccessToken: string;

  it('POST Create a new post', async () => {
    await request(app.getHttpServer())
      .post('/account/signin')
      .send({
        dto: {
          email: user.email,
          password: user.password,
        },
      })
      .then((response) => {
        currentUserAccessToken = response.body.tokens.at;
      });

    await request(app.getHttpServer())
      .post('/posts/add')
      .set({
        Authorization: `Bearer ${currentUserAccessToken}`,
      })
      .send({
        description: 'extremly long description lol',
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });

  it('GET get posts', async () => {
    await request(app.getHttpServer())
      .get('/posts/get')
      .query({ offset: 0, limit: 10 })
      .then((res) => {
        console.log(res.body);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.statusCode);
      });
  });
});
