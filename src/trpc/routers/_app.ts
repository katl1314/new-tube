import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { TRPCError } from '@trpc/server';

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
      throw new TRPCError({ message: '에러', code: 'INTERNAL_SERVER_ERROR' });
      return {
        greeting: `hello ${opts.input.text}`, // 프로시저가 반환하는 값 query
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
