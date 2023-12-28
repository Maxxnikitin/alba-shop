import clsx from 'clsx';
import { FC } from 'react';

import styles from './catalog-page.module.scss';
import { ICatalogPageProps } from './types';

import { CatalogMain } from '../../components';

import { Breadcrumbs } from '../../components/ui';

export const CatalogPage: FC<ICatalogPageProps> = ({ className = '', ...rest }) => (
  <section className={clsx(styles.container, className)} {...rest}>
    <Breadcrumbs />
    <CatalogMain />
  </section>
);
