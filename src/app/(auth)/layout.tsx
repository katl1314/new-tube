import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center my-auto min-h-screen items-center">
      {children}
    </div>
  );
}
