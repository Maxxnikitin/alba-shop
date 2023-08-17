import clsx from 'clsx';
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import styles from './items-with-filters.module.scss';

import { IItemsWithFiltersProps } from './types';

import { Item, QueryNotFound } from '..';
import { Filters } from '../filters';
import { Button, EButtonKinds, FilterPopupButton, Pagination, SortSelect, Title } from '../ui';

import { TItemsWithPaginationAndFilters, TSortingItems, getProducts } from '~utils';

const mockData = {
  meta: {
    pagination: {
      total_items: 1,
      num_pages: 1,
      next: null,
      previous: null,
    },
  },
  data: [
    {
      type: 'characteristics',
      id: 'rrewecdsc',
      name: 'Чехол Luxo original green',
      product_id: 'string44',
      weight: 10,
      stock: 20,
      in_cart: 0,
      price: '510.00',
      discount: 0,
      discounted_price: '510.00',
      color: 'Black',
      is_new: true,
      is_hit: true,
      in_favorite: false,
      photo: {
        front:
          'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
        left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
      },
    },
    {
      type: 'characteristics',
      id: 'rrewecdscs',
      name: 'Чехол Luxo original gray',
      product_id: 'string44',
      weight: 10,
      stock: 0,
      in_cart: 0,
      price: '487.00',
      discount: 20,
      discounted_price: '310.00',
      color: 'Black',
      is_new: true,
      is_hit: true,
      in_favorite: false,
      photo: {
        front:
          'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
        left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
      },
    },
    {
      type: 'characteristics',
      id: 'rrewecdscd',
      name: 'Чехол Luxo original yellow',
      product_id: 'string44',
      weight: 10,
      stock: 200,
      in_cart: 0,
      price: '460.00',
      discount: 13,
      discounted_price: '310.00',
      color: 'Black',
      is_new: true,
      is_hit: true,
      in_favorite: false,
      photo: {
        front:
          'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
        left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
      },
    },
    {
      type: 'characteristics',
      id: 'rrewecdscf',
      name: 'Чехол Luxo original black',
      product_id: 'string44',
      weight: 10,
      stock: 200,
      in_cart: 0,
      price: '410.00',
      discount: 21,
      discounted_price: '290.00',
      color: 'Black',
      is_new: false,
      is_hit: true,
      in_favorite: false,
      photo: {
        front:
          'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
        left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
      },
    },
    {
      type: 'characteristics',
      id: 'rrewecdscdt',
      name: 'Чехол Luxo original yellow',
      product_id: 'string44',
      weight: 10,
      stock: 200,
      in_cart: 0,
      price: '460.00',
      discount: 15,
      discounted_price: '340.00',
      color: 'Black',
      is_new: true,
      is_hit: true,
      in_favorite: false,
      photo: {
        front:
          'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
        left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
      },
    },
    {
      type: 'characteristics',
      id: 'rrewecdscfr',
      name: 'Чехол Luxo original black',
      product_id: 'string44',
      weight: 10,
      stock: 200,
      in_cart: 0,
      price: '410.00',
      discount: 30,
      discounted_price: '280.00',
      color: 'Black',
      is_new: true,
      is_hit: true,
      in_favorite: false,
      photo: {
        front:
          'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
        left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
      },
    },
  ],
};

export const ItemsWithFilters: FC<IItemsWithFiltersProps> = memo(
  ({ title, className = '', ...rest }) => {
    const [data, setData] = useState<TItemsWithPaginationAndFilters | null>(null);
    const [currSort, setCurrSort] = useState<TSortingItems>('is_hit');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const { t } = useTranslation();

    const { category } = useParams();

    const categoryId = useMemo(() => category?.split('_')[0], [category]);

    const handleSortingChange: ChangeEventHandler<HTMLSelectElement> = useCallback(e => {
      setCurrSort(e.target.value as TSortingItems);
    }, []);

    console.log({ data });

    const handleToggleFilters = useCallback(() => setIsFiltersOpen(prev => !prev), []);

    useEffect(() => {
      if (categoryId) {
        getProducts(categoryId).then(res => setData(res));
      }
    }, [currSort, categoryId]);

    if (!data) return <p>loader</p>;

    if (!data.data.length) return <QueryNotFound />;

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Title className={styles.title}>{title}</Title>
        <div className={styles.sort_filters_box}>
          <SortSelect value={currSort} onChange={handleSortingChange} className={styles.sort_box} />
          <FilterPopupButton className={styles.filter_btn} onClick={handleToggleFilters} />
          {isFiltersOpen && (
            <Filters
              filters={data.meta.filters}
              className={styles.filters_mob}
              isTitle
              isFooter
              onClose={handleToggleFilters}
            />
          )}
        </div>
        <div className={styles.columns}>
          <aside className={styles.filters_box}>
            <Filters filters={data.meta.filters} />
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
            <Button kind={EButtonKinds.load} text={t('items.load-btn')} />
            <Pagination className={styles.pagination} amountPage={4} activePage={1} />
          </div>
        </div>
      </div>
    );
  },
);
