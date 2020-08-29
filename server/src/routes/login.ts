import { RequestHandler } from "express";

const login: RequestHandler = (request, response) => {
  response.status(200).send('Login Route is working.');
};

export default login;
