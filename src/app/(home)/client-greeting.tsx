'use client';

import { trpc } from '@/trpc/client';

export const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: 'Antonio' }); // 데이터 불러오는 동안 Suspense의 fallback을 보여준다.
  return <div>Client Components {data.greeting}</div>;
};
