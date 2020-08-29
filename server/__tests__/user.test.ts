import { User } from 'src/database/models/user';
import { sequelize } from 'src/database/engine';

describe('User Model Binding', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  test('Create User', async (done) => {
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
