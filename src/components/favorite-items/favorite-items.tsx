import clsx from 'clsx';
import { FC, memo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './favorite-items.module.scss';

import { IFavoriteItemsProps } from './types';

import { Item } from '..';
import { Button, EButtonKinds, Pagination } from '../ui';

import { getFavoriteItems, TItemsWithPagination } from '~utils';

export const FavoriteItems: FC<IFavoriteItemsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TItemsWithPagination | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    getFavoriteItems()
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <p>loader</p>;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <ul className={styles.list}>
        {data.data?.map(item => (
          <Item key={item.id} data={item} onLikeClick={() => console.log('like')} isCartButton />
        ))}
      </ul>
      <Button kind={EButtonKinds.load} text={t('items.load-btn')} />
      <Pagination className={styles.pagination} amountPage={4} activePage={1} />
    </div>
  );
});
