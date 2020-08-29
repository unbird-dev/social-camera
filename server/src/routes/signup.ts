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
      response.status(200).send({
        token: generateAccessToken({ id: user.id, name: user.name }),
        id: user.id,
        name: user.name,
        latestImage: user.latestImage
      });
    })
    .catch((error) => response.status(409).send(error));
};

export default signup;
