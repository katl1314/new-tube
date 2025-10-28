'use client';

import { Button } from '@/components/ui/button';
import { ClapperboardIcon, UserCircleIcon } from 'lucide-react';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

const AuthButton = () => {
  return (
    <>
      {/* 로그인 상태인 경우 보여줌 */}
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            {/* TODO Add User Profile */}
            {/* 메뉴 추가 */}
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={<ClapperboardIcon className="size-4" />}
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      {/* 비 로그인시 보여줌 */}
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-600 border-blue-500/2 rounded-full shadow-none [&_svg]:size-5"
          >
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default AuthButton;
