import request from 'supertest';

import * as R from 'ramda';
const { prop } = R;

import app from '../app';
import { createLog } from '../logs/logging';
const log = createLog(__filename);

describe('router-get-movie-summary.spec', () => {
    const chai = require('chai');
    const expect = chai.expect;
    const assert = chai.assert;

    log.info('retrieve movie summaries ');
    it('get', (done) => {
        request(app)
            .get(`/summary`)
            .expect(200)
            .then((res: any) => {
                expect(res).to.be.ok;
                const found = prop('body', res);
                log.info('movies returned %j', found[0].title);
                expect(found[0].title).to.be.ok;
                done();
            }).catch((errors: any) => {
                log.error('movies not returned errors: %j', errors);
                done(errors);
            });
    });

});
