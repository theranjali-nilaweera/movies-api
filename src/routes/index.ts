
import { Router } from 'express';
import { index } from '../movie/index';

export const routes = Router();

routes.use('/', index);
