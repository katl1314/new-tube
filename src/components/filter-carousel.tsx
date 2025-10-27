'use client';

import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

interface FilterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
}

export const FilterCarousel: React.FC<FilterCarouselProps> = ({
  value,
  isLoading,
  onSelect,
  data,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentValue, setCurrentValue] = useState(0); // 시작 위치
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length); // 캐러셀의 총 개수
    setCurrentValue(api.selectedScrollSnap()); // 현재 위치

    api.on('select', () => {
      setCurrentValue(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full">
      {/* Left fade */}
      <div
        className={cn(
          'absolute left-12 top-0 bottom-0 w-12 z-5 bg-gradient-to-r from-white to-transparent pointer-events-none',
          currentValue === 1 && 'hidden',
        )}
      ></div>

      <Carousel
        opts={{ align: 'start', dragFree: true }}
        className="w-full px-12"
        setApi={setApi}
      >
        <CarouselContent className="-ml-3">
          {isLoading &&
            Array.from({ length: 14 }).map((_, index) => {
              return (
                <CarouselItem key={index} className="pl-3 basis-auto">
                  <Skeleton className="rounded-lg px-3 py-1 h-full text-sm w-[100px] font-semibold">
                    &nbsp;
                  </Skeleton>
                </CarouselItem>
              );
            })}
          {!isLoading && (
            <>
              <CarouselItem
                className="pl-3 basis-auto"
                onClick={() => onSelect(null)}
              >
                <Badge
                  variant={!value ? 'default' : 'secondary'}
                  className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
                >
                  All
                </Badge>
              </CarouselItem>
              {data.map(item => {
                return (
                  <CarouselItem
                    key={item.value}
                    className="pl-3 basis-auto"
                    onClick={() => onSelect(item.value)}
                  >
                    <Badge
                      variant={value === item.value ? 'default' : 'secondary'}
                      className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
                    >
                      {item.label}
                    </Badge>
                  </CarouselItem>
                );
              })}
            </>
          )}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-10" />
        <CarouselNext className="right-0 z-10" />
      </Carousel>
      {/* Right fade */}
      <div
        className={cn(
          'absolute right-12 top-0 bottom-0 w-12 z-5 bg-gradient-to-l from-white to-transparent pointer-events-none',
          currentValue === count - 1 && 'hidden',
        )}
      ></div>
    </div>
  );
};
