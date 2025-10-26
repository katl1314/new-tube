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
