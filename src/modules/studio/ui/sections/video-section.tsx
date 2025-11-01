'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const VideosSection = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideosSectionSuspense = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    trpc.studio.getMany.useInfiniteQuery(
      { limit: 5 },
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
      },
    );

  console.log('Full data object:', data);

  return (
    <div>
      {JSON.stringify(data)}
      <InfiniteScroll
        isManual={true}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
