import clsx from 'clsx';
import { FC, memo, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import styles from './brand-items.module.scss';

import { IBrandItemsProps } from './types';

import { QueryNotFound } from '../query-not-found';
import { CatalogItem, Title } from '../ui';

import { TCategory, getBrandCategories } from '~utils';

export const BrandItems: FC<IBrandItemsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TCategory[] | null>(null);
  const { brand } = useParams();

  const { t } = useTranslation();

  const [brandId, brandNameToPage] = useMemo(() => brand!.split('_'), [brand]);

  useEffect(() => {
    getBrandCategories(brandId)
      .then(({ data }) => setData(data))
      .catch(err => console.error(err));
  }, [brandId]);

  if (!data) return <p>loader</p>;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {data.length ? (
        <>
          <Title className={styles.title}>
            {t('brand-items.title', { brand: brandNameToPage })}
          </Title>
          <ul className={styles.list}>
            {data.map(item => (
              <CatalogItem key={item.id} data={item} prefixUrl={`/catalog/${brand}`} />
            ))}
          </ul>
        </>
      ) : (
        <QueryNotFound />
      )}
    </div>
  );
});
