import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import SearchInput from './search-input';
import AuthButton from '@/modules/auth/ui/components/auth-button';

const HomeNavbar = () => {
  return (
    <nav className="fixecd top-0 left-0 right-0 h-16 bg-white flex items-center px-2 py-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and LOgo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/">
            <div className="flex gap-1 p-4 items-center">
              <Image src="/logo.svg" alt="로고" width={32} height={32} />
              <p className="text-xl font-semibold tracking-tight">NewTube</p>
            </div>
          </Link>
        </div>

        {/* Search */}
        <div className="flex flex-1 justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>

        {/* Logout */}
        <div className="flex items-center flex-shrink-0 gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
