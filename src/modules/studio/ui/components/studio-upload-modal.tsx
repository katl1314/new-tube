'use client';

import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { PlusIcon } from 'lucide-react';
import React from 'react';

export const StudioUploadModal = () => {
  const create = trpc.video.create.useMutation();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        create.mutate();
      }}
    >
      <PlusIcon className="size-4" />
      Create
    </Button>
  );
};
