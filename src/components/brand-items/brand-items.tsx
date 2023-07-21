import clsx from 'clsx';
import { FC, memo, useContext, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import styles from './brand-items.module.scss';

import { IBrandItemsProps } from './types';

import { Breadcrumbs, CatalogItem, Title } from '../ui';

import { DataContext, TCategory } from '~utils';

export const BrandItems: FC<IBrandItemsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TCategory[] | null>(null);
  const { brand } = useParams();
  const { categories } = useContext(DataContext);

  const { t } = useTranslation();

  const brandNameToPage = useMemo(() => brand!.charAt(0).toUpperCase() + brand!.slice(1), [brand]);

  useEffect(() => {
    // fetchFn(`?sort=${currSort}${additionalQuery}`)
    //   .then(res => setData(res))
    //   .catch(err => console.error(err));

    setData(categories);
  }, [categories]);

  if (!data) return <p>loader</p>;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <Breadcrumbs brandName={brandNameToPage} />
      <Title className={styles.title}>{t('brand-items.title', { brand: brandNameToPage })}</Title>
      <ul className={styles.list}>
        {data.map(item => (
          <CatalogItem key={item.id} data={item} prefixUrl='/brands' />
        ))}
      </ul>
    </div>
  );
});
