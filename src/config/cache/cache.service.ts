import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {

  }

  /**
   *
   * @param key ke that will be used for key of cache. basically u can use arguments that is used for the function
   * @param ttl in second
   * @param setValue return of this clusure will be used as cache value
   *
   * @example
   * const userCached = this.cacheService.getCustomCache({name: 'Fauzi Fadhillah', age: 10 }, 10, () => {
   *   const resp = this.httpService.get('user', {
   *    data: {
   *     name: 'Fauzi Fadhilalh',
   *     age: 10
   *    }
   *   });
   *
   *   return resp.data
   * })
   * @returns
   */
  async getCustomCache<T>(
    key: unknown,
    ttl: number,
    setValue: () => T | Promise<T>,
  ): Promise<T | null> {
    const hash = crypto.createHash('md5');
    const generatedKey = hash.update(JSON.stringify(key)).digest('base64');

    let cacheValue = await this.cacheManager.get(generatedKey);

    if (cacheValue) {
      return JSON.parse(cacheValue as string) as T;
    }

    const value = await setValue();

    if (!value) return null;

    cacheValue = JSON.stringify(value);

    this.cacheManager.set(generatedKey, cacheValue, { ttl });

    return value as T;
  }
}
