import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10s'), // (요청 개수, 시간) 타임아웃 발생
});
