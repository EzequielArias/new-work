import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { user } from './helpers';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('It should signup an user', async () => {
    const result = await request(app.getHttpServer())
      .post('/account/signup')
      .send(user)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('currentUser')
        expect(res.body).toHaveProperty('tokens')
      })
      
      return result
  });


  it('It should login an user', async () => {
    const result = await request(app.getHttpServer())
    .post('/account/signin')
    .send({
      email : "eze@gmail.com",
      password : "Abcde12345#"
    })
    .expect(200)
    .expect((res) => {
      expect(res.body).toHaveProperty('currentUser')
      expect(res.body).toHaveProperty('tokens')
    })
  })

  afterAll(() => {
    app.close()
  })
});
