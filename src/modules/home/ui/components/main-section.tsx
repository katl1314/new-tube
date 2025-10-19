'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuth, useClerk } from '@clerk/nextjs';
import { FlameIcon, HomeIcon, PlaySquareIcon } from 'lucide-react';
import Link from 'next/link';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: HomeIcon,
  },
  {
    title: 'Subscriptions',
    url: '/feed/subscriptions',
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    title: 'Trending',
    url: '/feed/trending',
    icon: FlameIcon,
  },
];

const MainSection = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth(); // Clerk 토큰만 가져온다.
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={false} // TODO Change to look current pathname
                  onClick={ev => {
                    if (!isSignedIn && item.auth) {
                      ev.preventDefault();
                      return clerk.openSignIn(); // 모달을 실행함.
                    }
                  }} // TODO
                >
                  <Link href={item.url} className="flex items-center gap-4">
                    {/* 아이콘 추가 */}
                    <item.icon />
                    {/* 타이틀 추가 */}
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainSection;
