import { studioRouter } from '@/modules/studio/server/procedure';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { videoRouter } from '@/modules/videos/server/procedure';

// createTRPCRouter로 정의한 프로시저를 등록함.
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  studio: studioRouter,
  video: videoRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
