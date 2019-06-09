import NodeCache from 'node-cache';
const myCache = new NodeCache();
export const MOVIE_IDS = 'MOVIE_IDS';

export const saveCache =  (key: string, value: any): Promise<boolean> => {
    return Promise.resolve(myCache.set(key, value, 10000));
};

export const fetchCache =  (key: string): Promise<any> => {
  return Promise.resolve(myCache.get(key));
};
