import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google'; // next/font/google에서 글꼴을 사용한다.

import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  // variable: "--font-geist-sans",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NewTube',
  description: 'This is NewTube',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={'/'}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
