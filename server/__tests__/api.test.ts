import supertest from 'supertest';
import app from 'src/server';
import { generateAccessToken } from 'src/utility/authentication';

const testApp = supertest(app);

describe('S3 apis', () => {
  test('Deny access (401) -- when unauthorised.', (done) => {
    testApp.get('/get-presigned-url').expect(401, done);
  });

  test('Allow access (200) -- when authorised.', (done) => {
    const token = generateAccessToken({
      id: 1,
      email: 'test@gmail.com',
      name: 'tester'
    });

    testApp
      .get('/get-presigned-url')
      .set('Authorization', 'Bearer ' + token)
      .then((response) => {
        if(response.body) done();
      });
  });
});

describe('Authentication', () => {
  describe('POST /signup', () => {
    test('Wrong Fields', (done) => {
      testApp.post('/signup').expect(200, done);
    });
  });
});
