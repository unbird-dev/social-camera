import { RequestHandler } from "express";

const signup: RequestHandler = (request, response) => {
  response.status(200).send('Signup Route is working.');
};

export default signup;
