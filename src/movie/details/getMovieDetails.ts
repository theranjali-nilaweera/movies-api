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

export const getAllMovieDetails =  async (): Promise<any> => {
    log.info('getAllMovieDetails');
    let movieIds = fetchCache(MOVIE_CACHE_KEY);
    if (isNil(movieIds)) {
        const movies = await getAllMovieSummaries();
        movieIds = Array.from(movies.keys());
        log.info('getetails>new %j', movieIds);
    }
    return await detailRequests(movieIds);
};

const detailRequests = async (movieIds: string[]): Promise<MovieDetail[]> => {
    // log.info('getetails>detailRequests %j', movieIds);
    const moviDetails = new Map<string, MovieDetail>();
    movieIds.forEach(async (movieId) => {
        const response = await Promise.all(singleMovieRequest(movieId));
        let movieDetail: MovieDetail;
        const prices = new Array<Ticket>();
        (response || []).forEach( (singleDetail: any) => {
            movieDetail = new MovieDetail(singleDetail);
            log.info('transformMovieSummaries>movieDetail.id %j and all details \n %j', movieDetail.id, singleDetail );
            prices.push(new Ticket(movieDetail.id, movieDetail.price));
            if (!moviDetails.has(movieDetail.id)) {
                 movieDetail.populatePrice(prices);
                 movieDetail.id = movieIdCleaner(movieDetail.id);
                 moviDetails.set(movieDetail.id, movieDetail);
                 // log.info('transformMovieSummaries>processedMovies %j', processedMovies.get(id));
             }
        });

         // moviDetails.push(movieDetail);
    });
    return Promise.resolve(Array.from(moviDetails.values()));
};

const singleMovieRequest = (movieId: string): Array<Promise<any>> => {
    return movieProviders.map((movieProvider) => {
        return getMovie(movieProvider, movieId);
    });
};
