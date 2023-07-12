import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { user } from './helpers';

describe('Account controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let currentUserAccessToken: string;

  it('It must send an error message', async () => {
    await request(app.getHttpServer())
      .post('account/signup')
      .send({
        dto: {
          name: 'pepe',
          email: 'pepe@gmail.com',
          password: '12345',
        },
      })
      .then((res) => {
        expect(res.error).toBeInstanceOf(Array);
        expect(res.statusCode).toBe(400);
      });
  });

  it('It should signup an user', async () => {
    await request(app.getHttpServer())
      .post('/account/signup')
      .send({ dto: user })
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('currentUser');
        expect(res.body).toHaveProperty('tokens');
        currentUserAccessToken = res.body.tokens.at;
      });
  });

  it('It should login an user', async () => {
    await request(app.getHttpServer())
      .post('/account/signin')
      .send({
        dto: {
          email: user.email,
          password: user.password,
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('currentUser');
        expect(res.body).toHaveProperty('tokens');
        currentUserAccessToken = res.body.tokens.at;
      });
  });

  it('logout an account', async () => {
    await request(app.getHttpServer())
      .post('/account/logout')
      .set({
        Authorization: `Bearer ${currentUserAccessToken}`,
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  it('verify an account', async () => {
    await request(app)
      .post('/account/verify-account')
      .set({
        Authorization: `Bearer ${currentUserAccessToken}`,
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  afterAll(() => {
    app.close();
  });
});
