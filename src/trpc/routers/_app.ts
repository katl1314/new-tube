import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';

export const appRouter = createTRPCRouter({
  private: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async opts => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(() => {
      return { greeting: `hello World!` };
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
