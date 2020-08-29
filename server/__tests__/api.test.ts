import supertest from 'supertest';
import app from 'src/server';
import { generateAccessToken } from 'src/utility/authentication';
import FormData from 'form-data';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import url from 'url';
import { sequelize } from "src/database/engine";

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
  beforeAll(()=> {
    sequelize.authenticate()
  })

  describe('Return Token -- when signed up successfully', () => {
    test('Wrong Fields', (done) => {
      testApp
        .post('/signup')
        .set('Accept', 'application/json')
        .send({
          name: 'tester',
          email: 'tester@gmil.com',
          password: 'password'
        })
        .then((response) => {
          console.log(response.body);
          done();
        });
    });
  });
});
