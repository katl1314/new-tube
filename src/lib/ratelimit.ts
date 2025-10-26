import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10s'), // 10초 내 10개 요청이 들어오면 타임아웃 발생 (요청 개수, 시간)
});
