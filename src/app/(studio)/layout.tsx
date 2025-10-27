import React from 'react';
import StudioLayout from '@/modules/studio/ui/layout/studio-layout';

const Layout = ({ children }: React.PropsWithChildren) => {
  return <StudioLayout>{children}</StudioLayout>;
};

export default Layout;
