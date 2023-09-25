import { useMemo } from 'react';
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

import { MainWrapperPage } from '../main-wrapper-page';
import { OrderItems } from '../order-items';

import { ProtectedRouteElement } from '../protected-route';

import { BrandsPage } from 'src/pages/brand-page';
import { DataContext } from '~utils';

import '../../models/init';

export function App() {
  console.log('Render App');
  const { pathname } = useLocation();

  const isAuthPage = useMemo(() => pathname === '/sign-in', [pathname]);

  const routes = useRoutes([
    {
      path: '/sign-in',
      element: <SignInPage />,
    },
    {
      path: '/',
      element: <ProtectedRouteElement element={<MainWrapperPage />} />,
      children: [
        {
          path: '',
          element: <MainPage />,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: '/catalog',
          element: <CatalogPage />,
        },
        {
          path: '/catalog/product/:id',
          element: <ItemDetailsPage />,
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
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <div className={styles.container}>
      <ScrollToTop />
      {!isAuthPage && <Header />}
      {routes}
      {!isAuthPage && <Footer />}
    </div>
  );
}
