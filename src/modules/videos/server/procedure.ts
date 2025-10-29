import { db } from '@/db';
import { videos } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';

export const videoRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    const [video] = await db
      .insert(videos)
      .values({
        userId,
        title: 'Untitled',
        description: '11',
      })
      .returning(); // 추가한 결과를 확인하려면 returning을 해야함.

    return { video };
  }),
});
