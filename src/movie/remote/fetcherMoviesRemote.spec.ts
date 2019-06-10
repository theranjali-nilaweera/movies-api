import {createLog} from '../../logs/logging';
import {getMovies, getMovie, movieProviders} from './fetcherMoviesRemote';

const log = createLog(__filename);

describe('movieFetcher.spec', () => {
    const chai = require('chai');
    const expect = chai.expect;

    it('should get movies from a provider  ', (done) => {

        getMovies(movieProviders[1])
            .then((res: any) => {

            log.info('Movies response : %', res);
            expect(res.body).to.be.ok;
            log.info('text %j', res.body.Movies[0]);
            done();
        })
            .catch((errors: any) => {
                log.error('Movies not returned after retries: %j', errors);
                done(errors);
        });

    });

    it('\n should get details for movie  ', (done) => {

        getMovie(movieProviders[0], '0076759')
            .then((res: any) => {
            log.info('Movie details : %s', res);
            expect(res).to.be.ok;
            done();
        })
            .catch((errors: any) => {
                log.error('Movies not returned after retries: %j', errors);
                done(errors);
        });

    });

});
