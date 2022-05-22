import { useEffect, useState } from 'react';

type ApiParams = Parameters<typeof fetch>;

type CacheProps = {
  key: string;
  lifetime: number;
};

type CacheItem<T = unknown> = {
  timestamp: number;
  item: T;
};

function getFromCache<T>({ key, lifetime }: CacheProps): T | null {
  const cachedItem = localStorage[key];
  const cached: CacheItem<T> = cachedItem && JSON.parse(cachedItem);
  if (cached?.timestamp > new Date().getTime() - lifetime) {
    return cached.item;
  }
  return null;
}

function writeToCache(key: string, item: unknown) {
  const toWrite: CacheItem<unknown> = { timestamp: new Date().getTime(), item };
  localStorage[key] = JSON.stringify(toWrite);
}

export default function useApi<T = unknown>(p: ApiParams, cache?: CacheProps, transform?: ((arg: T) => Promise<T>)) {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState();
  useEffect(() => {
    const url = p[0];
    const cached = cache && getFromCache<T>(cache);
    if (cached) {
      setResponse(cached);
    } else if (url) {
      fetch(...p)
        .then((r) => r.json())
        .then(r => transform ? transform(r) : r)
        .then((r) => {
          if (cache) writeToCache(cache.key, r);
          setResponse(r);
        })
        .catch(setError);
    }
  }, [p[0]]);
  return { response, error };
}
