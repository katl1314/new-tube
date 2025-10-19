import React from 'react';
import HomeLayout from '../../modules/home/ui/layout/home-layout';

// home 라우트 그룹에서만 사용하는 Layout
const Layout = ({ children }: React.PropsWithChildren) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
