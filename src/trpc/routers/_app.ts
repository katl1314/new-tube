import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';

// 프로시저
// baseProcedure는 Public Procedure를 의미한다.
export const appRouter = createTRPCRouter({
  hello: protectedProcedure // 비 로그인 시 호출할 수 없음.
    .input(
      // input은 프로시저가 받기 기대한 내용을 zod로 검증한 것
      z.object({
        text: z.string(),
      }),
    )
    .query(async opts => {
      // 사용자 정보는 TRPC Context에서 하고 있음.
      console.log({ fromContext: opts.ctx.clerkUserId, dbUser: opts.ctx.user }); // TRPC Context의 값을 가져오려면 opts.ctx로 가져온다.

      return {
        greeting: `hello ${opts.input.text}`, // 프로시저가 반환하는 값 query
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

// zod : 타입스크립트 기반 라이브러리 스키마 선언 및 유효성 검사 제공
/**
 * const Man = z.object({
 *  text: z.string(),
 *  age: z.number(),
 *  hobby: z.string().optional()
 *  serve: z.boolean(), ...
 * })
 *
 * 검증
 * z.parse(Man); // 에러 시 throw
 *
 */
