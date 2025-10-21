import { HydrateClient, trpc } from '@/trpc/server';
import { PageClient } from './client-greeting';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Home() {
  // 서버 컴포넌트에서 데이터를 가져온다.
  // const { greeting } = await trpc.hello({ text: 'Antonio ' });
  void trpc.hello.prefetch({ text: 'Antonio' });
  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
