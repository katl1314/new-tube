import React from 'react';
import HomeLayout from '../../modules/home/ui/layout/home-layout';

const Layout = ({ children }: React.PropsWithChildren) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
