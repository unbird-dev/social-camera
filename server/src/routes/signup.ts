import { routeType } from 'routes/routeType';

const signup: routeType = (request, response) => {
  response.status(200).send('Signup Route is working.');
};

export default signup;
