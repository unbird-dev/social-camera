import { RequestHandler } from 'express';
import { createPresignedUrl } from 'src/utility/presignedUrl';

const getPresignedUrl: RequestHandler = (request, response) => {
  // TODO: Check if necessary ?.
  if (response.locals.id) response.status(200).send('all good');

  const pre = createPresignedUrl({ name: 'test' });
  console.log(pre);
  response.status(401);
};

export default getPresignedUrl;
