import { routeType } from 'routes/routeType';

const getPresignedUrl: routeType = (request, response) => {
  response.status(200).send('all good');
};

export default getPresignedUrl;
