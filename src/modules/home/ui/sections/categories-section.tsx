'use client';

import { FilterCarousel } from '@/components/filter-carousel';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface CategoriesSectionProps {
  categoryId?: string;
}

// useSuspenseQuery를 사용하는 컴포넌트 바로 위에 감싸는것이 좋다.
export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <ErrorBoundary fallback={<div>Error!!</div>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

// Suspense 동안 대신 보여줌.
const CategoriesSkeleton = () => {
  return <FilterCarousel isLoading={true} data={[]} onSelect={() => {}} />;
};

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const router = useRouter();
  const [categories] = trpc.categories.getMany.useSuspenseQuery(); // 서버에서 프리패치한 데이터를 접근(캐싱된 데이터 가져옴.)

  // 캐러셀 선택 이벤트
  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    console.log(value);
    if (value) {
      url.searchParams.set('categoryId', value);
    } else {
      url.searchParams.delete('categoryId');
    }

    router.push(url.href);
  };
  // Next.js 15에서 Link는 prefetch를 기본으로 제공
  return (
    <>
      <FilterCarousel
        value={categoryId}
        data={categories.map(({ id, name }) => ({ value: id, label: name }))}
        isLoading={false}
        onSelect={onSelect}
      />
    </>
  );
};

// TODO 10.27 shadcn category ui 적용
