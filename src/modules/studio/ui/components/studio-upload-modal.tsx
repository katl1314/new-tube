'use client';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { PlusIcon, LoaderCircle } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { StudioUploader } from './studio-uploader';

export const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const create = trpc.video.create.useMutation({
    onMutate: async () => {
      await utils.studio.getMany.cancel(); // 진행중인 refetch 취소
    },
    onSuccess: ({ video }) => {
      toast.success('Video created');

      // Optimistic update: 새 비디오를 첫 페이지에 추가

      const currentData = utils.studio.getMany.getInfiniteData({ limit: 5 });
      if (currentData) {
        // 첫 페이지에 새 비디오 추가
        const newPages = [...currentData.pages];
        if (newPages[0]) {
          newPages[0] = {
            ...newPages[0],
            items: [video, ...newPages[0].items],
          };
        }

        // 업데이트된 데이터 설정
        utils.studio.getMany.setInfiniteData(
          { limit: 5 },
          {
            pages: newPages,
            pageParams: currentData.pageParams,
          },
        );
      } else {
        // 데이터가 없으면 invalidate
        utils.studio.getMany.invalidate();
      }
    },
    onError: () => {
      toast.error('Video created is failed.');
      utils.studio.getMany.invalidate();
    },
  });
  const onOpenChange = () => {
    create.reset();
  };

  // open 변경 이벤트 <PlusIcon className="size-4" />
  return (
    <>
      <Button variant="secondary" onClick={() => create.mutate()}>
        {create.isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <PlusIcon className="size-4" />
        )}
        Create
      </Button>
      <ResponsiveDialog
        open={!!create.data?.url}
        onOpenChange={onOpenChange}
        title="Upload a videos"
      >
        {create.data ? (
          <StudioUploader
            endpoint={create.data?.url}
            onSuccess={() => console.log('성공')}
          />
        ) : (
          <LoaderCircle className="animate-spin" />
        )}
      </ResponsiveDialog>
    </>
  );
};
