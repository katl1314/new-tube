import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson'; // superjosn import
import { auth } from '@clerk/nextjs/server';
import { users } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { rateLimit } from '@/lib/ratelimit';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const { userId } = await auth(); // 활성화된 사용자 Auth객체를 반환 (서버 사이드 에서만 동작, 라우트 핸들러 포함)

  return { clerkUserId: userId };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>; // 함수 반환 타입
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson, // transformer에 superjson 할당
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure; // 공개된 프로시저

// 프로텍트 프로시저
export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts,
) {
  const { ctx } = opts;

  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  // 항상 배열로 반환함. drizzle-kit에 users테이블에서 조회함.
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, ctx.clerkUserId))
    .limit(1);

  const { success } = await rateLimit.limit(user.id);

  if (!success) {
    // 타임아웃 발생 10초동안 10개 요청이 발생 시 TOO_MANY_REQUESTS를 발생시킨다.
    throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
  }

  return opts.next({
    ctx: {
      ...ctx,
      user, // 사용자 정보 전달...
    },
  });
});
