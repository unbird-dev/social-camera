import supertest from 'supertest';
import app from 'src/server';

const testApp = supertest(app);

describe('S3 apis', () => {
  test('Get /get-presigned-url', (done) => {
    testApp.get('/get-presigned-url').expect(200, done);
  });
});

describe('Authentication', () => {
  describe('POST /signup', () => {
    test('Wrong Fields', (done) => {
      testApp.post('/signup').expect(200, done);
    });
  });
});
