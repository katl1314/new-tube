'use client';

import { trpc } from '@/trpc/client';

export const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: 'Antonio' });
  return <div>Client Components {data.greeting}</div>;
};
