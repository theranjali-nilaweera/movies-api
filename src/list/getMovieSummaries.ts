import request from 'superagent';
import {getMovies} from './movieFetcher';
import {MovieProvider} from './MovieProvider';
import {MovieSummary} from './MovieSummary';
import {movieIdCleaner} from './moviePrefixHelper';
import {createLog} from '../logs/logging';

const log = createLog(__filename);


export const movieProviders = [new MovieProvider('Cinema World', 'cinemaworld', 'cw'),
    new MovieProvider('Film World', 'filmworld', 'fw')];

export const getAllMovieSummaries = async (): Promise<any> =>{
    log.info('getAllMovieSummaries');
    let gotAllValues = false;

    const movies = await Promise.all(summaryRequests());
    return transformMovieSummaries(movies);
}

const summaryRequests = (): Array<Promise<any>> => {
    return movieProviders.map(movieProvider => {
        return getMovies(movieProvider);
    });
}

const transformMovieSummaries = (unProcessedMovies: Array<any>): Promise<Map<string, MovieSummary>> => {
    let processedMovies = new Map<string, MovieSummary>();

    unProcessedMovies.map(moviesPerProvider => {
        return moviesPerProvider.body.Movies;
    }).forEach((toProcess: any) => {
        toProcess.forEach( (singleMovie: any) => {
            const id = movieIdCleaner(singleMovie.ID);
            if (!processedMovies.has(id)) {
                processedMovies.set(id, new MovieSummary(singleMovie));
                // log.info('transformMovieSummaries>processedMovies %j', processedMovies.get(id));
            }
        });
    });
    log.info('transformMovieSummaries>processedMovies %j', processedMovies.values());
    return Promise.resolve(processedMovies);
}
