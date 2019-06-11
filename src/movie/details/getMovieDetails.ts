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

const responseBody = (response: any): any => {
    return isNil(response) ? {} : response.body;
};

const singleMovieRequest = (movieId: string): Array<Promise<any>> => {
    return movieProviders.map((movieProvider) => {
        return getMovie(movieProvider, movieId);
    });
};
