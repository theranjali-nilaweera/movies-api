
import { Router } from 'express';
import { index } from '../list/index';

export const routes = Router();

routes.use('/', index);
