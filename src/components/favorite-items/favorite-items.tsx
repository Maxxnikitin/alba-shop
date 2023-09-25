import clsx from 'clsx';
import { FC, memo, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './favorite-items.module.scss';

import { IFavoriteItemsProps } from './types';

import { Item } from '..';
import { EmptyFavorites } from '../empty-favorites';
import { Button, EButtonKinds, Pagination } from '../ui';

import { getFavoriteItems, TItemsWithPagination } from '~utils';

export const FavoriteItems: FC<IFavoriteItemsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TItemsWithPagination | null>(null);
  const [pageSize, setPageSize] = useState(18);
  const [currPaginationPage, setCurrPaginationPage] = useState(1);

  const { t } = useTranslation();

  const handleLoadMoreClick = useCallback(() => {
    setPageSize(pageSize + 18);
  }, [pageSize]);

  useEffect(() => {
    getFavoriteItems()
      .then(res => setData(res))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <p>loader</p>;

  if (!data?.data) return <EmptyFavorites />;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <ul className={styles.list}>
        {data.data?.map(item => (
          <Item key={item.id} data={item} onLikeClick={() => console.log('like')} isCartButton />
        ))}
      </ul>
      {data.meta.pagination.num_pages !== 1 && (
        <>
          <Button
            kind={EButtonKinds.load}
            text={t('items.load-btn')}
            onClick={handleLoadMoreClick}
          />
          <Pagination
            className={styles.pagination}
            amountPage={data.meta.pagination.num_pages}
            activePage={currPaginationPage}
            setCurrPaginationPage={setCurrPaginationPage}
          />
        </>
      )}
    </div>
  );
});
