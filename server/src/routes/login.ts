import { routeType } from 'routes/routeType';

const login: routeType = (request, response) => {
  response.status(200).send('Login Route is working.');
};

export default login;
