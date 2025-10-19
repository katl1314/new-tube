import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import MainSection from './main-section';
import PersonalSection from './personal-section';
import { Separator } from '@/components/ui/separator';

export default function HomeSidebar() {
  return (
    <Sidebar className="mt-16 z-40 border-none" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
}
