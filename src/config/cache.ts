import AppError from '@shared/errors/AppError';
import { Redis, RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  }
}

function getRedisConfig(): RedisOptions {
  if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    return {
      host: rtg.hostname,
      port: rtg.port,
      password: rtg.auth.split(":")[1],
    }
  } else if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
    return {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
    }
  } else {
    throw new AppError("Redis connection details not found!")
  }
}

export default {
  driver: 'redis',
  config: {
    redis: getRedisConfig(),
  },
} as ICacheConfig;