import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import styles from './catalog-clildren-page.module.scss';
import { ICatalogChildrenPageProps } from './types';

import { CatalogItems, ItemsWithFilters, PageWrapperWithCommonBlocks } from '../../components';
import { Breadcrumbs, Loader } from '../../components/ui';

import { TCategory, getCategory } from '~utils';

export const CatalogChildrenPage: FC<ICatalogChildrenPageProps> = ({ className = '', ...rest }) => {
  console.log('q');
  const [data, setData] = useState<TCategory | null>(null);
  const { pathname } = useLocation();
  const { category } = useParams();

  const currId = useMemo(() => category?.split('_')[0], [category]);

  useEffect(() => {
    if (currId) {
      getCategory(currId)
        .then(({ data }) => setData(data))
        .catch(err => console.log(err));
    }
  }, [currId]);

  if (!data) return <Loader />;

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Breadcrumbs />
      {data.children.length ? (
        <CatalogItems data={data.children} prefixUrl={pathname} />
      ) : (
        <PageWrapperWithCommonBlocks className={styles.wrapper}>
          <ItemsWithFilters title={data.name} />
        </PageWrapperWithCommonBlocks>
      )}
    </section>
  );
};
