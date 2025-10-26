import { HydrateClient, trpc } from '@/trpc/server';
import { PageClient } from './client-greeting';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Home() {
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
