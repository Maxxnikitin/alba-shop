import clsx from 'clsx';
import { useStore } from 'effector-react';
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';

import styles from './items-without-filters.module.scss';

import { IItemsWithoutFiltersProps } from './types';

import { Item, QueryNotFound } from '..';
import { Breadcrumbs, Loader, Pagination, Paragraph, SortSelect, Title } from '../ui';

import {
  $catalogCommonStore,
  getCatalogCommonFx,
  removeCommonItems,
  updateCatalogCommonBtnFx,
} from 'src/models';
import { TSortingItems, getSearch } from '~utils';

export const ItemsWithoutFilters: FC<IItemsWithoutFiltersProps> = memo(
  ({ title, fetchFn, additionalQuery = '', className = '', isSearchPage = false, ...rest }) => {
    const [currSort, setCurrSort] = useState<TSortingItems>('-is_hit');

    const { data } = useStore($catalogCommonStore);

    const { search } = useLocation();

    const q = useMemo(() => search.split('=')[1], [search]);

    const handleSortingChange: ChangeEventHandler<HTMLSelectElement> = useCallback(e => {
      setCurrSort(e.target.value as TSortingItems);
    }, []);

    useEffect(() => {
      if (!isSearchPage) {
        getCatalogCommonFx({
          queries: [`sort=${currSort}`, additionalQuery],
          fn: fetchFn,
        });
      } else {
        getCatalogCommonFx({ q, queries: [`sort=${currSort}`, additionalQuery], fn: getSearch });
      }
    }, [currSort, additionalQuery, fetchFn, isSearchPage, q]);

    useEffect(() => () => removeCommonItems(), []);

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

        {!!data?.data.length && (
          <SortSelect value={currSort} onChange={handleSortingChange} className={styles.sort_box} />
        )}
        {data.data.length ? (
          <ul className={styles.list}>
            {data.data.map(item => (
              <Item key={item.id} data={item} isCartButton />
            ))}
          </ul>
        ) : (
          <QueryNotFound className={styles.not_found} />
        )}
        {data.meta.pagination.num_pages !== 1 && (
          <Pagination
            className={styles.pagination}
            amountPages={data.meta.pagination.num_pages}
            currSort={currSort}
            onClick={getCatalogCommonFx}
            onBtnLoadClick={updateCatalogCommonBtnFx}
            additionalQuery={additionalQuery}
            q={q}
            callback={isSearchPage ? getSearch : fetchFn}
          />
        )}
      </div>
    );
  },
);
