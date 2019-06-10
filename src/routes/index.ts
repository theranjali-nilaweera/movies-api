
import { Router } from 'express';
import { movieRouter } from '../movie/index';

export const routes = Router();

routes.use('/', movieRouter);
