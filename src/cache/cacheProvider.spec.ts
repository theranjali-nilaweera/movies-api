import {createLog} from '../logs/logging';
import {saveCache, fetchCache} from './cacheProvider';

const log = createLog(__filename);

describe('cacheProvider.spec', () => {
    const chai = require('chai');
    const expect = chai.expect;
    const TEMP_KEY = 'Test_Key';
    const TEMP_VALUE = ['Test_Value1', 'Test_Value2'];

    it('should save cache  ', (done) => {
        try {
            const res = saveCache(TEMP_KEY, TEMP_VALUE);
            expect(res).to.be.true;
            log.info('temp value cached: %j', res);
            done();
        } catch (errors) {
            log.error('Movitemp value not cached : %j', errors);
            done(errors);
        }

    });

    it('should feth cache  ', (done) => {
        try {
            const res = fetchCache(TEMP_KEY);
            log.info('temp value cached: %j', res);
            expect(res).to.equal(TEMP_VALUE);
            done();
        } catch (errors) {
            log.error('temp value not cached : %j', errors);
            done(errors);
        }

    });

});
