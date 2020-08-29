import { User } from 'src/database/models/user';
import { sequelize } from 'src/database/engine';

describe('User Model Binding', () => {
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

  // test('Create a user without name', async (done) => {
  //   User.create({ hashedPassword: 'password', email: 'email2@gmail.com' })
  //     .then((user) => {
  //       throw new Error('User was create without a name');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       expect(error).toHaveProperty('name cannot be null');
  //     });
  // });
});
