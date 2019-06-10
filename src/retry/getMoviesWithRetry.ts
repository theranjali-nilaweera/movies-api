import request from 'superagent';
import R from 'ramda';
const {isNil, equals} = R;
import {createLog} from '../logs/logging';
const apiToken = {'x-access-token': 'sjd1HfkjU83ksdsm3802k'};

const log = createLog(__filename);

export const getResponse = async (url: string): Promise<any> => {
    log.info('getResponse');
    const NUM_RETRIES = 5;

    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            log.info('getResponse try %j', i);
            const respone = await request
                .get(url)
                .timeout({response: 20000})
                .set(apiToken);
            log.info('getResponse got value %s', respone);
            return Promise.resolve(respone);
        } catch (err) {
            log.info('getResponse error %j', err);
            if (equals(404, err.status)) {
                return Promise.resolve({});
            }
            await delay(10 * i);
        }
    }
    console.log(i); // 3

};

const delay = (duration: number) => {
    new Promise((resolve) => setTimeout(resolve, duration));
};

export const getResponseX = async (url: string): Promise<any> => {
    log.info('getResponse');
    return await loopGet(url);
};

const performGet = (url: string): Promise<any> => {
    return request
        .get(url)
        .set(apiToken);
};
// // async function f() {
// //
// //     try {
// //         let response = await fetch('http://no-such-url');
// //     } catch(err) {
// //         alert(err); // TypeError: failed to fetch
// //     }
// // }

const loopGet = async (url: string): Promise<any> => {
    log.info('getResponse loopGet %j', url);
    try {

        log.info('getResponse loopGet response await');
        return await request
            .get(url)
            .set(apiToken);
    } catch (err) {
        if (isNil(err.status) && isNil(err.response)) {
            log.info('getResponse loopGet isnil coz time out');
            return loopGet(url);
        }
        if (equals(500, err.status)) {
            log.info('getResponse loopGet isnil coz 500 ');
            return loopGet(url);
        }
        log.info('getResponse loopGet errors');
        return loopGet(url);
    }

};
