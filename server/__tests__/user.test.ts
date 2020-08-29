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
});
