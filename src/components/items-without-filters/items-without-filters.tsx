import clsx from 'clsx';
import { FC, memo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './items-without-filters.module.scss';

import { IItemsWithoutFiltersProps } from './types';

import { Item } from '..';
import { Button, EButtonKinds, Title } from '../ui';

import { TItemsWithPagination } from '~utils';

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
      is_bestseller: true,
      in_favorite: false,
      photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
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
      is_bestseller: true,
      in_favorite: false,
      photo: ['https://mykapitan.ru/wp-content/uploads/2022/11/01-12.jpg'],
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
      is_bestseller: false,
      in_favorite: false,
      photo: [
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
      ],
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
      is_bestseller: true,
      in_favorite: false,
      photo: [
        'https://белоеяблоко.рф/upload/resize_cache/iblock/e98/800_800_1a1fde8d5e7dcaa11be442336c9d37f5e/y3xladtiypp4q4asb15458430j8h59wv.jpeg',
      ],
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
      is_bestseller: true,
      in_favorite: false,
      photo: [
        'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
        'https://img.mvideo.ru/Pdb/50129627b.jpg',
      ],
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
      is_bestseller: true,
      in_favorite: false,
      photo: [
        'https://белоеяблоко.рф/upload/resize_cache/iblock/e98/800_800_1a1fde8d5e7dcaa11be442336c9d37f5e/y3xladtiypp4q4asb15458430j8h59wv.jpeg',
      ],
    },
  ],
};

export const ItemsWithoutFilters: FC<IItemsWithoutFiltersProps> = memo(
  ({ title, fetchFn, additionalQuery = '', className = '', ...rest }) => {
    const [data, setData] = useState<TItemsWithPagination | null>(null);
    const [query] = useState(additionalQuery ? `?${additionalQuery}` : '');

    const { t } = useTranslation();

    useEffect(() => {
      // fetchFn(query)
      //   .then(res => setData(res))
      //   .catch(err => console.error(err));

      setData(mockData);
    }, [fetchFn, query]);

    if (!data) return <p>loader</p>;

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Title className={styles.title}>{title}</Title>
        <ul className={styles.list}>
          {data.data.map(item => (
            <Item key={item.id} data={item} onLikeClick={() => console.log('like')} isCartButton />
          ))}
        </ul>
        <Button kind={EButtonKinds.load} text={t('items.load-btn')} />
      </div>
    );
  },
);
