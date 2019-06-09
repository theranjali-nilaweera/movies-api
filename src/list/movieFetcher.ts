import request from 'superagent';
import { createLog } from '../logs/logging';
import { MovieProvider } from './MovieProvider';
const log = createLog(__filename);
const baseUrl = 'webjetapitest.azurewebsites.net/api/';
const apiToken = {'x-access-token': 'sjd1HfkjU83ksdsm3802k'};


export const movieProviders = [new MovieProvider('Cinema World','cinemaworld','cw'),
    new MovieProvider('Film World','filmworld','fw')];

export const getMovies =  async (provider: MovieProvider) : Promise<any> => {
    log.info('getMovies from %j', provider);
    return request
        .get(baseUrl + provider.name + '/movies')
        .set(apiToken)
        .retry(5);
}

export const getMovie =  async (provider: MovieProvider, movieId: string) : Promise<any> =>{
    log.info('getMovie from %j', provider.name);
    return request
        .get(movieDetailUrl(provider)+movieId)
        .set(apiToken)
        .retry(5);
}

const movieDetailUrl = (provider: MovieProvider) => {
    return baseUrl+provider.name+'/movie/'+provider.idPrefix;
}
