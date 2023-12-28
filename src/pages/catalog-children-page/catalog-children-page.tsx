import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import styles from './catalog-children-page.module.scss';
import { ICatalogChildrenPageProps } from './types';

import { CatalogItems, ItemsWithFilters, PageWrapperWithCommonBlocks } from '../../components';
import { Breadcrumbs, Loader } from '../../components/ui';

import { ItemDetailsPage } from '../item-details-page';

import { TCategory, getCategory } from '~utils';

export const CatalogChildrenPage: FC<ICatalogChildrenPageProps> = ({ className = '', ...rest }) => {
  const [data, setData] = useState<TCategory | null>(null);
  const { pathname } = useLocation();
  const { id } = useParams();

  // если есть categoryName, значит речь идёт о категории. Если нету, значит это конкретный товар
  const [currId, categoryName] = useMemo(() => id?.split('_') ?? [], [id]);

  useEffect(() => {
    if (!categoryName) return;

    setData(null);

    if (currId) {
      getCategory(currId)
        .then(({ data }) => setData(data))
        .catch(err => console.log(err));
    }
  }, [currId, categoryName]);

  if (categoryName && !data) return <Loader />;

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Breadcrumbs isProduct={!categoryName} />
      {!categoryName ? (
        <ItemDetailsPage className={styles.item_page} />
      ) : data?.children.length ? (
        <CatalogItems data={data.children} prefixUrl={pathname} />
      ) : (
        <PageWrapperWithCommonBlocks className={styles.wrapper}>
          <ItemsWithFilters title={data?.name ?? ''} />
        </PageWrapperWithCommonBlocks>
      )}
    </section>
  );
};
