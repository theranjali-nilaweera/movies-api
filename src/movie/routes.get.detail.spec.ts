import request from 'supertest';

import * as R from 'ramda';
const { prop } = R;

import app from '../app';
import { createLog } from '../logs/logging';
const log = createLog(__filename);

describe('router-get-movie-detail.spec', () => {
    const chai = require('chai');
    const expect = chai.expect;
    const assert = chai.assert;

    log.info('retrieve movie details ');
    it('get', (done) => {
        request(app)
            .get(`/detail/2488496`)
            .expect(200)
            .then((res: any) => {
                expect(res).to.be.ok;
                const found = prop('body', res);
                log.info('movies returned %j', found);
                done();
            })
            .catch((errors: any) => {
                log.error('movies not returned errors: %j', errors);
                done(errors);
            });
    });

});
