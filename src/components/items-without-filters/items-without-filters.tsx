import clsx from 'clsx';
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './items-without-filters.module.scss';

import { IItemsWithoutFiltersProps } from './types';

import { Item } from '..';
import { Breadcrumbs, Button, EButtonKinds, Pagination, SortSelect, Title } from '../ui';

import { TItemsWithPagination, TSortingItems } from '~utils';

export const ItemsWithoutFilters: FC<IItemsWithoutFiltersProps> = memo(
  ({ title, fetchFn, additionalQuery = '', className = '', ...rest }) => {
    const [data, setData] = useState<TItemsWithPagination | null>(null);
    const [currPaginationPage, setCurrPaginationPage] = useState(1);
    const [currSort, setCurrSort] = useState<TSortingItems>('-is_hit');

    const { t } = useTranslation();

    const handleSortingChange: ChangeEventHandler<HTMLSelectElement> = useCallback(e => {
      setCurrSort(e.target.value as TSortingItems);
    }, []);

    useEffect(() => {
      fetchFn(`?sort=${currSort}${additionalQuery}`)
        .then(res => setData(res))
        .catch(err => console.error(err));
    }, [currSort, additionalQuery, fetchFn]);

    if (!data) return <p>loader</p>;

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
        <Button kind={EButtonKinds.load} text={t('items.load-btn')} />
        <Pagination
          className={styles.pagination}
          amountPage={4}
          activePage={1}
          setCurrPaginationPage={setCurrPaginationPage}
        />
      </div>
    );
  },
);
