import { FC, useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './main-wrapper-page.module.scss';
import { TMainWrapperProps } from './type';

import { Footer } from '../footer';
import { Header } from '../header';
import { ScrollToTop } from '../scroll-to-top';

import { Loader } from '../ui';

import { updateCartFx, updateFavoritesFx } from 'src/models';
import { useLoader } from 'src/utils/hooks/use-loader';
import { DataContext, useContextData } from '~utils';

export const MainWrapperPage: FC<TMainWrapperProps> = () => {
  const { contextData } = useContextData();

  const { isLoader } = useLoader();

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
      {!isAuthPage && <Footer className={styles.footer} />}
      {isLoader && <Loader withOverlay />}
    </DataContext.Provider>
  );
};
