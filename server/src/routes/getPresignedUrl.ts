import { RequestHandler } from "express";

const getPresignedUrl: RequestHandler = (request, response) => {
  response.status(200).send('all good');
};

export default getPresignedUrl;
