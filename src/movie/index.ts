import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllMovieSummaries } from './summary/getMovieSummaries';
import { getMovieDetailById } from './details/getMovieDetails';
import { createLog } from '../logs/logging';
const log = createLog(__filename);
const movieRouter: Router = Router();

movieRouter.get('/summary', asyncHandler(async (req: Request, res: Response) => {
    log.info('Fetching all movies summary');
    return res.json(await getAllMovieSummaries());
}));

movieRouter.get('/detail/:id', asyncHandler(async (req: Request, res: Response) => {
    log.info('Fetching all movie details');
    const movieId = req.params.id;
    res.json(await getMovieDetailById(movieId));
}));

export { movieRouter };
