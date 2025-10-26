import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10s'), // 10초 내 10개 요청이 들어오면 타임아웃 발생 (요청 개수, 시간)
});

/* 
  upstash란?
   - upstash.com에서 제공하는 서버리스 데이터 서비스
   - Redis, Kafka, 등 메시지 큐 & 스케쥴러 기능의 QStash 제공
   - 개인 프로젝트 용으로 사용하기 좋음

  Redis
   - 환경변수 2개를 .env에 넣어놓기
   - redis객체는 다음과 같이 생성
    new Redis({
      url: "https://****.upstash.io",
      token: "********",
    });

  Traffic Protection (교통 보호)
   - @upstash/ratelimit 기능 사용
   - 사용 예
    export const ratelimit = new Ratelimit({
      redis: Redis.fromEnv()
      , limiter: Ratelimit.slidingWindow(10, "10 s")
      , enableProtection: true // Ratelimt에서 거부목록을 확인하고 싶으면
      , analytics: true
    })

   - 사용 예
    - const {success, pending, reason, deniedValue } = await ratelimit.limit("userId", { ip, userAgent, country, ...})
    - 거부 시 reason 필드에 거부 목록의 값을 포함.
*/
