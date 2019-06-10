import request from 'superagent';
import { createLog } from '../../logs/logging';
import { MovieProvider } from '../MovieProvider';
import { getResponse } from '../../retry/getMoviesWithRetry';
const log = createLog(__filename);
const baseUrl = 'webjetapitest.azurewebsites.net/api/';

export const movieProviders = [new MovieProvider('Cinema World', 'cinemaworld', 'cw'),
    new MovieProvider('Film World', 'filmworld', 'fw')];

export const getMovies =  async (provider: MovieProvider): Promise<any> => {
    log.info('getMovies from %j', provider);
    return getResponse(baseUrl + provider.name + '/movies');
};

export const getMovie =  async (provider: MovieProvider, movieId: string): Promise<any> => {
    log.info('getMovie from %j', provider.name);
    return getResponse(movieDetailUrl(provider) + movieId);
};

const movieDetailUrl = (provider: MovieProvider) => {
    return baseUrl + provider.name + '/movie/' + provider.idPrefix;
};
