import { RequestHandler } from 'express';
import { createPresignedUrl } from 'src/utility/presignedUrl';

const getPresignedUrl: RequestHandler = (request, response) => {
  // TODO: Check if necessary ?.
  if (response.locals.id) {
    const pre = createPresignedUrl({ name: 'test' });

    response.status(200).send({url: `${pre.url}/${pre.fields.key}`});
  }

  response.status(401);
};

export default getPresignedUrl;
