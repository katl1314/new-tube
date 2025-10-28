'use client';

import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/user-avatar';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export const StudioSidebarHeader = () => {
  const { user } = useUser();
  const { open } = useSidebar(); // Sidebar내부에서만 사용 가능. 사이드바가 열려있는지 상태값을 반환함.

  if (!user)
    return (
      <>
        <SidebarHeader className="flex items-center justify-center pb-4">
          <Skeleton className={'w-[160px] h-[165px] rounded-full'} />
          <div className={'flex items-center flex-col mt-4 gap-y-2'}>
            <Skeleton className="w-[80px] h-4" />
            <Skeleton className="w-[120px] h-4" />
          </div>
        </SidebarHeader>
      </>
    );

  const imageUrl = user?.imageUrl || '';
  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link href="/users/current">
        <UserAvatar
          imageUrl={imageUrl}
          username={user.fullName || 'User'}
          size={open ? 'xl' : 'md'}
          className="hover:opacity-80 transition-opacity"
        />
      </Link>
      <div
        className={cn(
          open ? 'flex items-center flex-col mt-2 gap-y-1' : 'hidden',
        )}
      >
        <p>Your profile</p>
        <p>{user.fullName}</p>
      </div>
    </SidebarHeader>
  );
};
