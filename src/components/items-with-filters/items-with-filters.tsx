import clsx from 'clsx';
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import styles from './items-with-filters.module.scss';

import { IItemsWithFiltersProps } from './types';

import { Item, QueryNotFound } from '..';
import { Filters } from '../filters';
import {
  Button,
  EButtonKinds,
  FilterPopupButton,
  Modal,
  Pagination,
  SortSelect,
  Title,
} from '../ui';

import { TItemsWithPaginationAndFilters, TSortingItems, getProducts } from '~utils';

export const ItemsWithFilters: FC<IItemsWithFiltersProps> = memo(
  ({ title, className = '', ...rest }) => {
    const [data, setData] = useState<TItemsWithPaginationAndFilters | null>(null);
    const [currSort, setCurrSort] = useState<TSortingItems>('-is_hit');
    const [pageSize, setPageSize] = useState(3);
    const [currPaginationPage, setCurrPaginationPage] = useState(1);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const { t } = useTranslation();

    const { category } = useParams();

    const categoryId = useMemo(() => category?.split('_')[0], [category]);

    const handleSortingChange: ChangeEventHandler<HTMLSelectElement> = useCallback(e => {
      setCurrSort(e.target.value as TSortingItems);
    }, []);

    const handleToggleFilters = useCallback(() => setIsFiltersOpen(prev => !prev), []);

    const handleLoadMoreClick = useCallback(() => {
      setPageSize(pageSize + 3);
    }, [pageSize]);

    useEffect(() => {
      if (categoryId) {
        getProducts(
          categoryId,
          `sort=${currSort}`,
          `page_size=${pageSize}`,
          `page=${currPaginationPage}`,
        ).then(res => setData(res));
      }
    }, [currSort, categoryId, pageSize, currPaginationPage]);

    if (!data) return <p>loader</p>;

    if (!data.data.length) return <QueryNotFound />;

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Title className={styles.title}>{title}</Title>
        <div className={styles.sort_filters_box}>
          <SortSelect value={currSort} onChange={handleSortingChange} className={styles.sort_box} />
          <FilterPopupButton className={styles.filter_btn} onClick={handleToggleFilters} />
          <Modal isOpen={isFiltersOpen} onClose={handleToggleFilters} className={styles.modal}>
            <Filters
              filters={data.meta.filters}
              className={styles.filters_mob}
              isTitle
              isFooter
              onClose={handleToggleFilters}
              categoryId={categoryId}
              currSort={currSort}
              setData={setData}
            />
          </Modal>
        </div>
        <div className={styles.columns}>
          <aside className={styles.filters_box}>
            <Filters
              filters={data.meta.filters}
              categoryId={categoryId}
              setData={setData}
              currSort={currSort}
            />
          </aside>
          <div className={styles.main_content}>
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
        </div>
      </div>
    );
  },
);
