import supertest from 'supertest';
import app from 'src/server';
import { generateAccessToken } from 'src/utility/authentication';
import FormData from 'form-data';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import url from 'url';
import { sequelize } from 'src/database/engine';
import { User } from 'src/database/models/user';
import { response } from 'express';

const testApp = supertest(app);

describe('S3 apis', () => {
  test('Deny access (401) -- when unauthorised.', (done) => {
    testApp.get('/get-presigned-url').expect(401, done);
  });

  test('Allow access (200) -- when authorised.', () => {
    const token = generateAccessToken({
      id: 1,
      name: 'tester'
    });

    testApp
      .get('/get-presigned-url')
      .set('Authorization', 'Bearer ' + token)
      .then(({ body }) => {
        const form = new FormData();

        const { hostname, path, port } = url.parse(body.url);

        form.append(
          'file',
          createReadStream(resolve(__dirname, 'assets', '300.png'))
        );

        form.submit(
          {
            hostname,
            port,
            path,
            method: 'PUT'
          },
          (error, response) => {
            response.resume();
            expect(response.statusCode).toBe(200);
          }
        );
      });
  });
});

describe('Authentication', () => {
  beforeAll(() => {
    sequelize.authenticate();
  });

  describe('Signup', () => {
    beforeAll(async () => {
      const tester = await User.findOne({
        where: {
          name: 'tester',
          email: 'tester@gmail.com'
        }
      });
      tester?.destroy();
    });

    test('Return Token, User -- when successfully signed up', async (done) => {
      testApp
        .post('/signup')
        .set('Accept', 'application/json')
        .send({
          name: 'tester',
          email: 'tester@gmail.com',
          password: 'password'
        })
        .then((response) => {
          expect(response.status).toBe(200);
          done()
        });
    });

    test('Return 422, User -- when password is missing.',  async (done) => {
      testApp
        .post('/signup')
        .set('Accept', 'application/json')
        .send({
          name: 'tester',
          email: 'tester@gmail.com',
        })
        .then((response) => {
          expect(response.status).toBe(422);
          done()
        });
    });

    test('Return 422, User -- when name is missing.',  async (done) => {
      testApp
        .post('/signup')
        .set('Accept', 'application/json')
        .send({
          email: 'tester@gmail.com',
          password: 'password'
        })
        .then((response) => {
          expect(response.status).toBe(422);
          done()
        });
    });

    test('Return 422, User -- when email is missing.',  async (done) => {
      testApp
        .post('/signup')
        .set('Accept', 'application/json')
        .send({
          name: 'tester',
          password: 'password'
        })
        .then((response) => {
          expect(response.status).toBe(422);
          done()
        });
    });
  });
});
