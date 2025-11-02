'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { InfiniteScroll } from '@/components/infinite-scroll';
import { DEFAULT_LIMIT } from '@/constants';
import { trpc } from '@/trpc/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { VideoThumbnail } from '@/modules/videos/ui/components/video-thumbnail';
import { snakeCaseToTitle } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';
import { Globe2Icon, LockIcon } from 'lucide-react';

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
              <TableHead className="text-center">Views</TableHead>
              <TableHead className="text-center">Comments</TableHead>
              <TableHead className="text-center pr-6">Likes</TableHead>
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
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="relative aspect-video w-36 shrink-0">
                            <VideoThumbnail
                              thumbnailUrl={video.thumbnailUrl}
                              previewUrl={video.previewUrl}
                              title={video.title}
                              duration={video.duration || 0}
                            />
                          </div>
                          <div className="flex flex-col overflow-hidden gap-y-1">
                            {/* line-clamp-1 텍스트를 지정된 줄 수 만큼 제한할때 */}
                            <span className="text-sm line-clamp-1">
                              {video.title}
                            </span>
                            <span className="text-xs text-muted-foreground line-clamp-1">
                              {video.description || 'no description'}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="">
                        {video.visibility === 'private' ? (
                          <LockIcon className="size-4 mr-2 inline-block" />
                        ) : (
                          <Globe2Icon className="size-4 mr-2 inline-block" />
                        )}
                        <span className="align-middle">
                          {snakeCaseToTitle(video.visibility)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {snakeCaseToTitle(video.muxStatus || 'error')}
                      </TableCell>
                      <TableCell className="text-sm truncate">
                        {/* truncate: 글자가 길어지면 짤리도록 */}
                        {format(video.createdAt, 'yyyy-MM-dd hh:mm:ss')}
                      </TableCell>
                      <TableCell className="text-center">{0}</TableCell>
                      <TableCell className="text-center">{0}</TableCell>
                      <TableCell className="text-center">{0}</TableCell>
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
