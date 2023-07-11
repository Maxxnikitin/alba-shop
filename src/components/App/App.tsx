import { useRoutes } from 'react-router-dom';

import styles from './App.module.scss';

import { Header, Footer, ScrollToTop } from '..';

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
} from '../../pages';

import { ItemsWithFilters } from '../items-with-filters';

import { BrandsPage } from 'src/pages/brand-page';
import { DataContext, useContextData } from '~utils';

export function App() {
  console.log('Render App');
  const { contextData } = useContextData();

  const routes = useRoutes([
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
      element: <p>Cart</p>,
    },
    {
      path: '/favorites',
      element: <p>favorite</p>,
    },
    {
      path: '/catalog/:id',
      element: <ItemDetailsPage />,
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
      path: '/:brand',
      element: <BrandsPage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <div className={styles.container}>
      <ScrollToTop />
      <DataContext.Provider value={contextData}>
        <Header />
        {routes}
        <Footer />
      </DataContext.Provider>
    </div>
  );
}
