import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import AuthButton from '@/modules/auth/ui/components/auth-button';
import { StudioUploadModal } from './studio-upload-modal';

export default function StudioNavbar() {
  return (
    <nav className="fixecd top-0 left-0 right-0 h-16 bg-white flex items-center px-2 py-5 z-50 border-b shadow-md">
      <div className="flex items-center gap-4 w-full justify-between">
        {/* Menu and LOgo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/studio">
            <div className="flex gap-1 p-4 items-center">
              <Image src="/logo.svg" alt="로고" width={32} height={32} />
              <p className="text-xl font-semibold tracking-tight">Studio</p>
            </div>
          </Link>
        </div>
        {/* Logout */}
        <div className="flex items-center flex-shrink-0 gap-4">
          <StudioUploadModal />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
