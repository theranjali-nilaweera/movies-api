import request from 'superagent';
import { getMovies } from '../remote/fetcherMoviesRemote';
import { MovieProvider } from '../MovieProvider';
import { MovieSummary } from './MovieSummary';
import { movieIdCleaner } from '../moviePrefixHelper';
import { createLog } from '../../logs/logging';
import { saveCache, MOVIE_CACHE_KEY } from '../../cache/cacheProvider';

const log = createLog(__filename);

export const movieProviders = [new MovieProvider('Cinema World', 'cinemaworld', 'cw'),
    new MovieProvider('Film World', 'filmworld', 'fw')];

export const getAllMovieSummaries = async (): Promise<any> => {
    log.info('getAllMovieSummaries');

    const movies = await Promise.all(summaryRequests());
    log.info('getAllMovieSummaries');
    return await transformMovieSummaries(movies);
};

const summaryRequests = (): Array<Promise<any>> => {
    return movieProviders.map((movieProvider) => {
        return getMovies(movieProvider);
    });
};

const transformMovieSummaries = (unProcessedMovies: any[]): Promise<MovieSummary[]> => {
    const processedMovies = new Map<string, MovieSummary>();

    unProcessedMovies.map((moviesPerProvider) => {
        return moviesPerProvider.body.Movies;
    }).forEach((toProcess: any) => {

        toProcess.forEach( (singleMovie: any) => {

            const id = movieIdCleaner(singleMovie.ID);
            // log.info('transformMovieSummaries>singleMovie %j id %j', id, singleMovie);
            if (!processedMovies.has(id)) {
                // log.info('transformMovieSummaries>singleMovie no ID putting anew');
                processedMovies.set(id, new MovieSummary(singleMovie));
                log.info('transformMovieSummaries>processedMovies %s', processedMovies.get(id));
            }
        });
    });
    // log.info('transformMovieSummaries>processedMovies keys to cache %j',  Array.from(processedMovies.keys()));
    saveCache(MOVIE_CACHE_KEY, Array.from(processedMovies.keys()));
    return Promise.resolve(Array.from(processedMovies.values()));
};
