import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import HomeNavbar from '../components/home-navbar';
import HomeSidebar from '../components/home-sidebar';

// home 라우트 그룹에서만 사용하는 Layout
const HomeLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        {/* 상단 헤더 */}
        <HomeNavbar />
        <div className="flex min-h-screen">
          {/* 사이드 바 */}
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HomeLayout;
