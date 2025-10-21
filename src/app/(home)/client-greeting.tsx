'use client';

import { trpc } from '@/trpc/client';

export const PageClient = () => {
  // 서버에서 미리 데이터를 캐싱하기 때문에 클라이언트에서는 캐시에 저장된 데이터만 불러오면됨.
  const [data] = trpc.hello.useSuspenseQuery({ text: 'Antonio' });
  return <div>Client Components {data.greeting}</div>;
};
