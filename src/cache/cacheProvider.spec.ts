import {createLog} from '../logs/logging';
import {saveCache, fetchCache} from './cacheProvider';

const log = createLog(__filename);

describe('cacheProvider.spec', () => {
    const chai = require('chai');
    const expect = chai.expect;
    const TEMP_KEY = 'Test_Key';
    const TEMP_VALUE = 'Test_Value';

    it('should save cache  ', (done) => {

        saveCache(TEMP_KEY, TEMP_VALUE)
            .then((res: any) => {
                expect(res).to.be.true;
                log.info('temp value cached: %j', res);
                done();
        }).catch((errors: any) => {
                log.error('Movitemp value not cached : %j', errors);
                done(errors);
        });

    });

    it('should feth cache  ', (done) => {

        fetchCache(TEMP_KEY)
            .then((res: any) => {
            log.info('temp value cached: %j', res);
            expect(res).to.equal(TEMP_VALUE);
            done();
        }).catch((errors: any) => {
                log.error('temp value not cached : %j', errors);
                done(errors);
        });

    });

});
