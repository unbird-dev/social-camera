import { RequestHandler } from "express";

const getPresignedUrl: RequestHandler = (request, response) => {
  if (response.locals.id) response.status(200).send('all good');

  response.status(401);
};

export default getPresignedUrl;
