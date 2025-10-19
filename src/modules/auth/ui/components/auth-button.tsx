'use client';

import { Button } from '@/components/ui/button';
import { UserCircleIcon } from 'lucide-react';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

const AuthButton = () => {
  return (
    <>
      {/* 로그인 상태인 경우 보여줌 */}
      <SignedIn>
        <UserButton />
        {/* Add Menu items for Studio and User Profile */}
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
