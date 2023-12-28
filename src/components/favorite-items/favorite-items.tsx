import clsx from 'clsx';
import { useStore } from 'effector-react';
import { FC, memo, useEffect } from 'react';

import styles from './favorite-items.module.scss';

import { IFavoriteItemsProps } from './types';

import { Item } from '..';
import { EmptyFavorites } from '../empty-favorites';
import { Loader, Pagination } from '../ui';

import {
  $favoriteItemsStore,
  getFavoriteItemsFx,
  removeFavoriteItems,
  updateFavoriteItemsBtnFx,
} from 'src/models';

export const FavoriteItems: FC<IFavoriteItemsProps> = memo(({ className = '', ...rest }) => {
  const { data } = useStore($favoriteItemsStore);

  useEffect(() => {
    getFavoriteItemsFx({ queries: [] });
    return () => removeFavoriteItems();
  }, []);

  if (!data) return <Loader />;

  if (!data?.data) return <EmptyFavorites />;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <ul className={styles.list}>
        {data.data?.map(item => (
          <Item key={item.id} data={item} isCartButton />
        ))}
      </ul>
      {data.meta.pagination.num_pages !== 1 && (
        <Pagination
          className={styles.pagination}
          amountPages={data.meta.pagination.num_pages}
          onClick={getFavoriteItemsFx}
          onBtnLoadClick={updateFavoriteItemsBtnFx}
        />
      )}
    </div>
  );
});
