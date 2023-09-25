import { FC, useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { TMainWrapperProps } from './type';

import { Footer } from '../footer';
import { Header } from '../header';
import { ScrollToTop } from '../scroll-to-top';

import { updateCartFx, updateFavoritesFx } from 'src/models';
import { DataContext, useContextData } from '~utils';

export const MainWrapperPage: FC<TMainWrapperProps> = () => {
  const { contextData } = useContextData();

  const { pathname } = useLocation();

  const isAuthPage = useMemo(() => pathname === '/sign-in', [pathname]);

  useEffect(() => {
    updateCartFx();
    updateFavoritesFx();
  }, []);

  return (
    <DataContext.Provider value={contextData}>
      <ScrollToTop />
      {!isAuthPage && <Header />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </DataContext.Provider>
  );
};
