import { User } from 'src/database/models/user';
import { sequelize } from 'src/database/engine';

describe('User Creation Test', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  test('Create a new User -- when every required parameter is provided.', async (done) => {
    User.create({
      name: 'testOne',
      hashedPassword: 'password',
      email: 'email2@gmail.com'
    }).then(async (user) => {
      await user.destroy();
      done();
    });
  });

  test('Not create a new User -- when name is omitted.', async (done) => {
    User.create({ hashedPassword: 'password', email: 'email2@gmail.com' })
      .then((user) => {
        throw new Error('User was create without a name');
      })
      .catch((error) => {
        expect(error.message).toContain('name cannot be null');
        done();
      });
  });

  test('Not create a new User -- when email is omitted.', async (done) => {
    User.create({ name: 'test', hashedPassword: 'password' })
      .then((user) => {
        throw new Error('User was created without email.');
      })
      .catch((error) => {
        expect(error.message).toContain('email cannot be null');
        done();
      });
  });

  test('Not create a new User -- when email is ill-formatted.', async (done) => {
    User.create({ name: 'test', hashedPassword: 'password', email: 'hello_world' })
      .then((user) => {
        throw new Error('User was created ill-formatted email.');
      })
      .catch((error) => {
        expect(error.message).toContain('Validation isEmail on email failed');
        done();
      });
  })
  test('Not create a new User -- when hashedPassword is omitted.', async (done) => {
    User.create({ name: 'test', email: 'email@gaml.com' })
      .then((user) => {
        throw new Error('User was created without hashedPassword.');
      })
      .catch((error) => {
        expect(error.message).toContain('hashedPassword cannot be null');
        done();
      });
  });
});
