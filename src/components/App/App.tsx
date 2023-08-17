import { useEffect, useMemo } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';

import styles from './App.module.scss';

import { Header, Footer, ScrollToTop, FavoriteItems, PersonalData } from '..';

import {
  AboutPage,
  FaqPage,
  NotFound,
  ItemDetailsPage,
  LatestPage,
  BestsellersPage,
  DiscountPage,
  DiscountWithPercentPage,
  MainPage,
  SignInPage,
  PersonalAccountPage,
  CartPage,
  CatalogPage,
  CatalogChildrenPage,
} from '../../pages';

import { ItemsWithFilters } from '../items-with-filters';

import { OrderItems } from '../order-items';

import { updateCartFx, updateFavoritesFx } from 'src/models';
import { BrandsPage } from 'src/pages/brand-page';
import { DataContext, useContextData } from '~utils';

import '../../models/init';

export function App() {
  console.log('Render App');
  const { contextData } = useContextData();
  const { pathname } = useLocation();

  const isAuthPage = useMemo(() => pathname === '/sign-in', [pathname]);

  const routes = useRoutes([
    {
      path: '/sign-in',
      element: <SignInPage />,
    },
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/account',
      element: <p>Account</p>,
    },
    {
      path: '/cart',
      element: <CartPage />,
    },
    {
      path: '/favorites',
      element: <p>favorite</p>,
    },
    {
      path: '/catalog/:category',
      element: <CatalogChildrenPage />,
    },

    {
      path: '/catalog/:category/:category',
      element: <CatalogChildrenPage />,
    },
    {
      path: '/catalog/:category/:category/:category',
      element: <CatalogChildrenPage />,
    },
    {
      path: '/faq',
      element: <FaqPage />,
    },
    {
      path: '/about',
      element: <AboutPage />,
    },
    {
      path: '/latest',
      element: <LatestPage />,
    },
    {
      path: '/bestsellers',
      element: <BestsellersPage />,
    },
    {
      path: '/discount',
      element: <DiscountPage />,
    },
    {
      path: '/discount/:percent',
      element: <DiscountWithPercentPage />,
    },
    {
      path: '/test',
      element: <ItemsWithFilters title='test' />,
    },
    {
      path: '/personal-account',
      element: <PersonalAccountPage />,
      children: [
        {
          path: 'orders',
          element: <OrderItems />,
        },
        {
          path: 'favorite',
          element: <FavoriteItems />,
        },
        {
          path: 'data',
          element: <PersonalData />,
        },
        {
          path: 'coupons',
          element: <p>coupons</p>,
        },
      ],
    },
    {
      path: '/brands',
      element: <BrandsPage />,
    },
    {
      path: '/brands/:brand',
      element: <BrandsPage />,
    },
    {
      path: '/catalog',
      element: <CatalogPage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  useEffect(() => {
    updateCartFx();
    updateFavoritesFx();
  }, []);

  return (
    <div className={styles.container}>
      <ScrollToTop />
      <DataContext.Provider value={contextData}>
        {!isAuthPage && <Header />}
        {routes}
        {!isAuthPage && <Footer />}
      </DataContext.Provider>
    </div>
  );
}
