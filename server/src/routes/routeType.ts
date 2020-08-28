import {Request, Response} from 'express';

export type routeType = (request: Request, response: Response) => void;
