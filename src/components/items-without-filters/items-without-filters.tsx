import clsx from 'clsx';
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './items-without-filters.module.scss';

import { IItemsWithoutFiltersProps } from './types';

import { Item } from '..';
import { Breadcrumbs, Button, EButtonKinds, Loader, Pagination, SortSelect, Title } from '../ui';

import { TItemsWithPagination, TSortingItems } from '~utils';

export const ItemsWithoutFilters: FC<IItemsWithoutFiltersProps> = memo(
  ({ title, fetchFn, additionalQuery = '', className = '', ...rest }) => {
    const [data, setData] = useState<TItemsWithPagination | null>(null);
    const [pageSize, setPageSize] = useState(18);
    const [currPaginationPage, setCurrPaginationPage] = useState(1);
    const [currSort, setCurrSort] = useState<TSortingItems>('-is_hit');

    const { t } = useTranslation();

    const handleSortingChange: ChangeEventHandler<HTMLSelectElement> = useCallback(e => {
      setCurrSort(e.target.value as TSortingItems);
    }, []);

    const handleLoadMoreClick = useCallback(() => {
      setPageSize(pageSize + 18);
    }, [pageSize]);

    useEffect(() => {
      fetchFn(`?sort=${currSort}&page=${currPaginationPage}${additionalQuery}`)
        .then(res => setData(res))
        .catch(err => console.error(err));
    }, [currSort, additionalQuery, currPaginationPage, fetchFn]);

    if (!data) return <Loader />;

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Breadcrumbs />
        <Title className={styles.title}>{title}</Title>
        <SortSelect value={currSort} onChange={handleSortingChange} className={styles.sort_box} />
        <ul className={styles.list}>
          {data.data.map(item => (
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
  },
);
