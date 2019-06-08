import cors from 'cors';
import express from 'express';

import { createLog } from './logs/logging';
import { routes } from './routes';

const log = createLog(__filename);

export const app = express();

app.set('port', 3000);
app.use(cors({allowedHeaders: ['Content-Type', 'Authorization', 'Content-Encoding']}));
app.use('/', routes);

log.info('Start up movies api');

export default app;
