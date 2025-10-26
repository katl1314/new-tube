import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
// import { TRPCError } from '@trpc/server';

// 프로시저
// baseProcedure는 Public Procedure를 의미한다.
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      // input은 프로시저가 받기 기대한 내용을 zod로 검증한 것
      z.object({
        text: z.string(),
      }),
    )
    .query(opts => {
      //throw new TRPCError({ message: '에러', code: 'INTERNAL_SERVER_ERROR' });

      // 데이터베이스에서 데이터를 로드한다...

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
