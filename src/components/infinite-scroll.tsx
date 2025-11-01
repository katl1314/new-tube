import { useIntersectionObserver } from '@/hooks/use-intersectionObserver';
import { useEffect } from 'react';
import { Button } from './ui/button';

interface InfiniteScrollProps {
  isManual?: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export const InfiniteScroll = ({
  isManual = false,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: InfiniteScrollProps) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
      fetchNextPage();
    }
  }, [
    isIntersecting,
    hasNextPage,
    isFetchingNextPage,
    isManual,
    fetchNextPage,
  ]);
  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={targetRef} className="h-1"></div>
      {hasNextPage ? (
        <Button
          variant="secondary"
          disabled={!isFetchingNextPage && !hasNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more....'}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">목록 끝에 도달하였다.</p>
      )}
    </div>
  );
};
