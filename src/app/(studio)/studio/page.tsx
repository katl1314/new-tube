import { StudioView } from '@/modules/studio/ui/views/studio-views';
import { getQueryClient, HydrateClient, trpc } from '@/trpc/server';
import { DEFAULT_LIMIT } from '@/constants';
import React from 'react';

const Page = async () => {
  const queryClient = getQueryClient();
  // 커서를 명시적으로 undefined로 전달
  const initalData = await trpc.studio.getMany({ limit: DEFAULT_LIMIT });
  const queryKey = [
    ['studio', 'getMany'],
    {
      input: { limit: DEFAULT_LIMIT },
      type: 'infinite',
    },
  ];
  const updater = {
    pages: [initalData],
    pageParams: [undefined],
  };
  const queryFn = () => Promise.resolve(initalData);
  // prefetchInfinite를 사용시 queryClient에 저장이 안되는 이슈
  queryClient.setQueryData(queryKey, updater);

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: undefined,
    getNextPageParam: (lastPage: { nextCursor: any }) => lastPage.nextCursor,
  });

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};

export default Page;
