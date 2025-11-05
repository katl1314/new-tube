import { db } from '@/db';
import { videoInsertSchema, videos } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { mux } from '@/lib/mux';
import { and, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const videoRouter = createTRPCRouter({
  update: protectedProcedure
    .input(videoInsertSchema)
    .mutation(async ({ ctx, input }) => {
      // 업데이트시 title, description, category를 전달한다. input에

      const { id: userId } = ctx.user;

      // 비디오 조회
      const [video] = await db
        .update(videos)
        .set({
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          visibility: input.visibility as 'public' | 'private',
          updatedAt: new Date(),
        })
        .where(and(eq(videos.id, input.id!), eq(videos.userId, userId)))
        .returning();

      if (!video) {
        throw new TRPCError({
          message: 'video is not found',
          code: 'BAD_REQUEST',
        });
      }
    }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    // 비디오 업로드 시 즉시 처리되지 않는다. 반드시 웹훅이 있어야한다.
    // 웹훅에서는 어떤이가 업로드했는지 알 수 없으므로 passthrough에 추가해야한다.
    const upload = await mux.video.uploads.create({
      cors_origin: '*', // TODO 운영환경에서는 우리의 URL로 설정해야함.
      new_asset_settings: {
        passthrough: userId,
        playback_policy: ['public'],
        input: [
          {
            generated_subtitles: [
              // 자막
              {
                language_code: 'en',
                name: 'English',
              },
            ],
          },
        ],
      },
    });

    console.log(upload.url);

    const [video] = await db
      .insert(videos)
      .values({
        userId,
        title: 'Untitled',
        muxStatus: 'waiting',
        muxUploadId: upload.id,
      })
      .returning(); // 추가한 결과를 확인하려면 returning을 해야함.

    return { video, url: upload.url };
  }),
});
