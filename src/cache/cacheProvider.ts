import NodeCache from 'node-cache';
const movieCache = new NodeCache();
export const MOVIE_CACHE_KEY = 'MOVIE_IDS';

export const saveCache = (key: string, value: string[]): boolean => {
    return movieCache.set(key, value, 10000);
};

export const fetchCache = (key: string): any => {
  return movieCache.get(key);
};
