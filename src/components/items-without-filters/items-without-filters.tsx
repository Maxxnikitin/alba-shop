import clsx from 'clsx';
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useLocation, useParams } from 'react-router-dom';

import styles from './items-without-filters.module.scss';

import { IItemsWithoutFiltersProps } from './types';

import { Item, QueryNotFound } from '..';
import {
  Breadcrumbs,
  Button,
  EButtonKinds,
  ETitleLevel,
  Loader,
  Pagination,
  Paragraph,
  SortSelect,
  Title,
} from '../ui';

import { TItemsWithPagination, TSortingItems, getSearch } from '~utils';

export const ItemsWithoutFilters: FC<IItemsWithoutFiltersProps> = memo(
  ({ title, fetchFn, additionalQuery = '', className = '', isSearchPage = false, ...rest }) => {
    const [data, setData] = useState<TItemsWithPagination | null>(null);
    const [pageSize, setPageSize] = useState(18);
    const [currPaginationPage, setCurrPaginationPage] = useState(1);
    const [currSort, setCurrSort] = useState<TSortingItems>('-is_hit');

    const { search } = useLocation();

    const { t } = useTranslation();

    const q = useMemo(() => search.split('=')[1], [search]);

    const handleSortingChange: ChangeEventHandler<HTMLSelectElement> = useCallback(e => {
      setCurrSort(e.target.value as TSortingItems);
    }, []);

    const handleLoadMoreClick = useCallback(() => {
      setPageSize(pageSize + 18);
    }, [pageSize]);

    useEffect(() => {
      if (!isSearchPage) {
        fetchFn?.(
          `?sort=${currSort}&page=${currPaginationPage}&page_size=${pageSize}${additionalQuery}`,
        )
          .then(res => setData(res))
          .catch(err => console.error(err));
      } else {
        getSearch(
          q,
          `?sort=${currSort}&page=${currPaginationPage}&page_size=${pageSize}${additionalQuery}`,
        )
          .then(res => setData(res))
          .catch(err => console.error(err));
      }
    }, [currSort, additionalQuery, currPaginationPage, fetchFn, isSearchPage, q, pageSize]);

    if (!data) return <Loader />;

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Breadcrumbs />
        <div className={styles.title_box}>
          <Title className={styles.title}>{title}</Title>
          {q && (
            <Paragraph className={styles.title_q} isGradient>
              {decodeURI(q)}
            </Paragraph>
          )}
        </div>

        <SortSelect value={currSort} onChange={handleSortingChange} className={styles.sort_box} />
        {data.data.length ? (
          <ul className={styles.list}>
            {data.data.map(item => (
              <Item
                key={item.id}
                data={item}
                onLikeClick={() => console.log('like')}
                isCartButton
              />
            ))}
          </ul>
        ) : (
          <QueryNotFound className={styles.not_found} />
        )}
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
