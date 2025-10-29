import { StudioView } from '@/modules/studio/ui/views/studio-views';
import { HydrateClient, trpc } from '@/trpc/server';
import React from 'react';

const Page = async () => {
  void trpc.studio.getMany.prefetchInfinite({ limit: 5 });

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};

export default Page;
