import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import StudioNavbar from '../components/studio-navbar';
import StudioSidebar from '../components/stdio-sidebar';

// home 라우트 그룹에서만 사용하는 Layout
const StudioLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        {/* 상단 헤더 */}
        <StudioNavbar />
        <div className="flex min-h-screen">
          {/* 사이드 바 */}
          <StudioSidebar />
          <main className="flex-1 overflow-y-auto mt-[65px]">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudioLayout;
