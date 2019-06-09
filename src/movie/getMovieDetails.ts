import request from 'superagent';
import { getMovie } from './movieFetcher';
import { MovieProvider } from './MovieProvider';
import { movieIdCleaner } from './moviePrefixHelper';
import { createLog } from '../logs/logging';
import { fetchCache, MOVIE_IDS } from '../cache/cacheProvider';
import {getAllMovieSummaries, movieProviders } from './getMovieSummaries';
import {MovieDetail} from './MovieDetail';
import {Charge} from './Charge';
import R from 'ramda';
const { isNil } = R;

const log = createLog(__filename);

export const getAllMovieDetails =  async (): Promise<any> => {
    log.info('getAllMovieDetails');
    const gotAllValues = false;

    let movieIds = await fetchCache(MOVIE_IDS);
    log.info('getetails>getAllMovieDetails %j', movieIds);
    if (isNil(movieIds)) {
        const movies = await getAllMovieSummaries();
        movieIds = movies.keys();
        log.info('getetails>new %j', movies.keys());
    }

    return await detailRequests(movieIds);
};

const detailRequests = async (movieIds: string[]): Promise<Map<string, MovieDetail>> => {
    log.info('getetails>detailRequests %j', movieIds);
    const moviDetails = new Map<string, MovieDetail>();
    movieIds.forEach(async (movieId) => {
        const response = await Promise.all(singleMovieRequest(movieId));
        let movieDetail: MovieDetail;
        const prices = new Array<Charge>();
        (response || []).forEach( (singleDetail: any) => {
            movieDetail = new MovieDetail(singleDetail);
            prices.push(new Charge(movieDetail.id, movieDetail.price));
            if (!moviDetails.has(movieDetail.id)) {
                 movieDetail.populatePrice(prices);
                 movieDetail.id = movieIdCleaner(movieDetail.id);
                 moviDetails.set(movieDetail.id, movieDetail);
                 // log.info('transformMovieSummaries>processedMovies %j', processedMovies.get(id));
             }
        });

         // moviDetails.push(movieDetail);
    });
    return Promise.resolve(moviDetails);
};

const singleMovieRequest = (movieId: string): Array<Promise<any>> => {
    return movieProviders.map((movieProvider) => {
        return getMovie(movieProvider, movieId);
    });
};
