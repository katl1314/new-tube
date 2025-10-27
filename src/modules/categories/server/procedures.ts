import { db } from '@/db';
import { categories } from '@/db/schema';

// 프로시저를 만드려면 createTRPCRouter를 사용해야함.
import { createTRPCRouter, baseProcedure } from '@/trpc/init';

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return await db.select().from(categories);
  }),
});
