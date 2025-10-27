'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { LogOutIcon, VideoIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { StudioSidebarHeader } from './studio-sidebar-header';

export default function StudioSidebar() {
  // pathname 가져오기
  const pathname = usePathname();

  return (
    <Sidebar className="mt-16 z-40" collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarMenu>
          <StudioSidebarHeader />
          <SidebarGroup>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === '/studio'}
                tooltip="Exit studio"
                asChild
              >
                <Link href="/studio" className="flex items-center gap-4">
                  <VideoIcon className="size-5" />
                  <span className="text-sm">Contents</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator />
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Exit studio" asChild>
                <Link href="/" className="flex items-center gap-4">
                  <LogOutIcon className="size-5" />
                  <span className="text-sm">Exit Studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
