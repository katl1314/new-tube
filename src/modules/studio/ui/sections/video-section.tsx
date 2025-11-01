'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { DEFAULT_LIMIT } from '@/constants';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

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
      { limit: DEFAULT_LIMIT },
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
      },
    );

  // isManual 사용시 IntersectionObserver를 끌 수 있음.
  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.pages
              .flatMap(page => page.items)
              .map(video => {
                return (
                  <Link
                    key={video.id}
                    href={`/studio/videos/${video.id}`}
                    legacyBehavior
                  >
                    <TableRow className="cursor-pointer">
                      <TableCell>{video.title}</TableCell>
                      <TableCell>{video.title}</TableCell>
                      <TableCell>{video.title}</TableCell>
                      <TableCell>{video.title}</TableCell>
                      <TableCell>{0}</TableCell>
                      <TableCell>{0}</TableCell>
                      <TableCell>{0}</TableCell>
                    </TableRow>
                  </Link>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        isManual
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
