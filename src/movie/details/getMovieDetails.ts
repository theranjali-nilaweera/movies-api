import request from 'superagent';
import { getMovie } from '../remote/fetcherMoviesRemote';
import { MovieProvider } from '../MovieProvider';
import { movieIdCleaner } from '../moviePrefixHelper';
import { createLog } from '../../logs/logging';
import { fetchCache, MOVIE_CACHE_KEY } from '../../cache/cacheProvider';
import {getAllMovieSummaries, movieProviders } from '../summary/getMovieSummaries';
import {MovieDetail} from './MovieDetails';
import {Ticket} from './Ticket';
import R from 'ramda';
const { isNil } = R;

const log = createLog(__filename);

export const getMovieDetailById = async (movieId: string): Promise<any> => {
    const responses = await Promise.all(singleMovieRequest(movieId));
    log.info('getMovieDetailById>>response ids %j', responses);
    const prices = new Array<Ticket>();
    const details = new Map<string, MovieDetail>();
    responses.filter((response) => {
        return !isNil(response.body);
    }).forEach((body) => {
        const detail = new MovieDetail(responseBody(body));
        details.set(movieId, detail);
        prices.push(new Ticket(detail.id, detail.price));
    });
    const detailForKey = details.get(movieId);
    if (!isNil(detailForKey)) {
        detailForKey.prices = prices;
        detailForKey.id = movieId;
    }
    log.info('getMovieDetailById>>response responseBody(response) %j', detailForKey);
    return detailForKey;
};

export const getAllMovieDetails =  async (): Promise<any> => {
    let movieIds = fetchCache(MOVIE_CACHE_KEY);
    log.info('getAllMovieDetails>>cached ids %j', movieIds);
    if (isNil(movieIds)) {
        const movies = await getAllMovieSummaries();
        movieIds = fetchCache(MOVIE_CACHE_KEY);
        log.info('getdetails>new %j', movieIds);
    }
    return await detailRequests(movieIds);
};

const detailRequests = async (movieIds: string[]): Promise<MovieDetail[]> => {
    const moviDetails = new Map<string, MovieDetail>();
    movieIds.forEach(async (movieId) => {
        const response = await Promise.all(singleMovieRequest(movieId));
        return response
            .filter((singleDetail: any) => {
                return !isNil(singleDetail) && !isNil(responseBody(singleDetail));
            })
            .map((singleDetail: any) => {
                log.info('transformMovieSummaries>singleDetail after nil %s  ', singleDetail);
                return responseBody(singleDetail);
            })
            .forEach((detail: any) => {
                // let movieDetail: MovieDetail;
                const prices = new Array<Ticket>();
                const movieDetail = new MovieDetail(detail);
                prices.push(new Ticket(movieDetail.id, movieDetail.price));
                if (!moviDetails.has(movieDetail.id)) {
                    movieDetail.populatePrice(prices);
                    movieDetail.id = movieIdCleaner(movieDetail.id);
                    moviDetails.set(movieDetail.id, movieDetail);
                    log.info('transformMovieSummaries>processedMovies no id in map%j', movieDetail.id);
                }
                return moviDetails;
            });
    });
    log.info('transformMovieSummaries>total  moviDetails %j', Array.from(moviDetails.keys()));
    return Promise.resolve(Array.from(moviDetails.values()));
};

const responseBody = (response: any): any => {
    return isNil(response) ? {} : response.body;
};

const singleMovieRequest = (movieId: string): Array<Promise<any>> => {
    return movieProviders.map((movieProvider) => {
        return getMovie(movieProvider, movieId);
    });
};
