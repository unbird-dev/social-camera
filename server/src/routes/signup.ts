import { RequestHandler } from 'express';
import { User, UserInstance } from 'src/database/models/user';
import {
  createHashedPassword,
  generateAccessToken
} from 'src/utility/authentication';

const signup: RequestHandler = (request, response) => {
  const { name, email } = request.body;

  User.create({
    name,
    email,
    hashedPassword: createHashedPassword(request.body.password)
  })
    .then((user: UserInstance) => {
      generateAccessToken({id: user.id, name: user.name});
      response.status(200).send('Signup Route is working.');
    })
    .catch((error) => response.status(409).send(error));
};

export default signup;
