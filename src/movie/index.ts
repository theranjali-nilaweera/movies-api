import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllMovieSummaries } from './getMovieSummaries';
import { getAllMovieDetails } from './getMovieDetails';
import { createLog } from '../logs/logging';
const log = createLog(__filename);
const index: Router = Router();

index.get('/summary', asyncHandler(async (req: Request, res: Response) => {
    log.info('Fetching all movies summary');
    res.json(await getAllMovieSummaries());
}));

index.get('/detail', asyncHandler(async (req: Request, res: Response) => {
    log.info('Fetching all movie details');
    res.json(await getAllMovieDetails());
}));

export { index };
