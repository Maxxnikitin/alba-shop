import clsx from 'clsx';
import { FC, memo, MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './order-items.module.scss';

import { IOrderItemsProps } from './types';

import { ItemOrder, OrderDetails } from '..';
import { Button, EButtonKinds, Pagination } from '../ui';

import { getOrders, TOrder, TOrdersWithPagination } from '~utils';

const mockData: TOrdersWithPagination = {
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
      type: 'orders',
      id: 123345,
      customer: {
        type: 'customers',
        id: 1,
        email: 'ivanov@yandex.ru',
        first_name: 'Иван',
        last_name: 'Иванов',
        company_name: null,
        phone_number: '+79001234567',
        city: null,
        order_amount: '134586.00',
        discount: 0,
        date_joined: '2022-09-21T22:38:40.125043+03:00',
        ext_id: null,
      },
      amount: 134586,
      weight: 0,
      status: 'NEW',
      content: [
        {
          type: 'positions',
          id: 0,
          characteristic: {
            type: 'characteristics',
            id: '8d44b432-9353-4d6b-89b8-4591e2f21d02',
            name: 'Стекло для iPhone 11 Pro 10D, Черный',
            product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
            is_new: true,
            is_hit: true,
            is_bestseller: true,
            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
          },
          quantity: 0,
          weight: 0,
          amount: 134586,
          discounted_amount: 0,
          final_amount: 0,
        },
        {
          type: 'positions',
          id: 1,
          characteristic: {
            type: 'characteristics',
            id: '8d44b432-9353-4d6b-89b8-4591e2f21d03',
            name: 'Стекло для iPhone 11 Pro 10D, Черный',
            product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
            is_new: true,
            is_hit: true,
            is_bestseller: true,
            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
          },
          quantity: 0,
          weight: 0,
          amount: 134586,
          discounted_amount: 0,
          final_amount: 0,
        },
        {
          type: 'positions',
          id: 2,
          characteristic: {
            type: 'characteristics',
            id: '8d44b432-9353-4d6b-89b8-4591e2f21d04',
            name: 'Стекло для iPhone 11 Pro 10D, Черный',
            product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
            is_new: true,
            is_hit: true,
            is_bestseller: true,
            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
          },
          quantity: 0,
          weight: 0,
          amount: 134586,
          discounted_amount: 0,
          final_amount: 0,
        },
        {
          type: 'positions',
          id: 3,
          characteristic: {
            type: 'characteristics',
            id: '8d44b432-9353-4d6b-89b8-4591e2f21d05',
            name: 'Стекло для iPhone 11 Pro 10D, Черный',
            product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
            is_new: true,
            is_hit: true,
            is_bestseller: true,
            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
          },
          quantity: 0,
          weight: 0,
          amount: 134586,
          discounted_amount: 0,
          final_amount: 0,
        },
      ],
      history: [
        {
          type: 'order_steps',
          id: 0,
          actor: 'string',
          created: '2023-07-13T11:38:25.821Z',
          status: 'NEW',
        },
      ],
      created: '2023-07-13T11:38:25.821Z',
      updated: '2023-07-13T11:38:25.821Z',
    },
    {
      type: 'orders',
      id: 123346,
      customer: {
        type: 'customers',
        id: 1,
        email: 'ivanov@yandex.ru',
        first_name: 'Иван',
        last_name: 'Иванов',
        company_name: null,
        phone_number: '+79001234567',
        city: null,
        order_amount: '134586.00',
        discount: 0,
        date_joined: '2022-09-21T22:38:40.125043+03:00',
        ext_id: null,
      },
      amount: 134586,
      weight: 0,
      status: 'IN_PROGRESS',
      content: [
        {
          type: 'positions',
          id: 0,
          characteristic: {
            type: 'characteristics',
            id: '8d44b432-9353-4d6b-89b8-4591e2f21d02',
            name: 'Стекло для iPhone 11 Pro 10D, Черный',
            product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
            is_new: true,
            is_hit: true,
            is_bestseller: true,
            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
          },
          quantity: 0,
          weight: 0,
          amount: 134586,
          discounted_amount: 0,
          final_amount: 0,
        },
      ],
      history: [
        {
          type: 'order_steps',
          id: 0,
          actor: 'string',
          created: '2023-07-13T11:38:25.821Z',
          status: 'NEW',
        },
      ],
      created: '2023-07-13T11:38:25.821Z',
      updated: '2023-07-13T11:38:25.821Z',
    },
    {
      type: 'orders',
      id: 123347,
      customer: {
        type: 'customers',
        id: 1,
        email: 'ivanov@yandex.ru',
        first_name: 'Иван',
        last_name: 'Иванов',
        company_name: null,
        phone_number: '+79001234567',
        city: null,
        order_amount: '134586.00',
        discount: 0,
        date_joined: '2022-09-21T22:38:40.125043+03:00',
        ext_id: null,
      },
      amount: 134586,
      weight: 0,
      status: 'READY',
      content: [
        {
          type: 'positions',
          id: 0,
          characteristic: {
            type: 'characteristics',
            id: '8d44b432-9353-4d6b-89b8-4591e2f21d02',
            name: 'Стекло для iPhone 11 Pro 10D, Черный',
            product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
            is_new: true,
            is_hit: true,
            is_bestseller: true,
            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
          },
          quantity: 0,
          weight: 0,
          amount: 134586,
          discounted_amount: 0,
          final_amount: 0,
        },
      ],
      history: [
        {
          type: 'order_steps',
          id: 0,
          actor: 'string',
          created: '2023-07-13T11:38:25.821Z',
          status: 'NEW',
        },
      ],
      created: '2023-07-13T11:38:25.821Z',
      updated: '2023-07-13T11:38:25.821Z',
    },
    {
      type: 'orders',
      id: 123348,
      customer: {
        type: 'customers',
        id: 1,
        email: 'ivanov@yandex.ru',
        first_name: 'Иван',
        last_name: 'Иванов',
        company_name: null,
        phone_number: '+79001234567',
        city: null,
        order_amount: '134586.00',
        discount: 0,
        date_joined: '2022-09-21T22:38:40.125043+03:00',
        ext_id: null,
      },
      amount: 134586,
      weight: 0,
      status: 'SENT',
      content: [
        {
          type: 'positions',
          id: 0,
          characteristic: {
            type: 'characteristics',
            id: '8d44b432-9353-4d6b-89b8-4591e2f21d02',
            name: 'Стекло для iPhone 11 Pro 10D, Черный',
            product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
            is_new: true,
            is_hit: true,
            is_bestseller: true,
            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
          },
          quantity: 0,
          weight: 0,
          amount: 134586,
          discounted_amount: 0,
          final_amount: 0,
        },
      ],
      history: [
        {
          type: 'order_steps',
          id: 0,
          actor: 'string',
          created: '2023-07-13T11:38:25.821Z',
          status: 'NEW',
        },
      ],
      created: '2023-07-13T11:38:25.821Z',
      updated: '2023-07-13T11:38:25.821Z',
    },
    {
      type: 'orders',
      id: 123349,
      customer: {
        type: 'customers',
        id: 1,
        email: 'ivanov@yandex.ru',
        first_name: 'Иван',
        last_name: 'Иванов',
        company_name: null,
        phone_number: '+79001234567',
        city: null,
        order_amount: '134586.00',
        discount: 0,
        date_joined: '2022-09-21T22:38:40.125043+03:00',
        ext_id: null,
      },
      amount: 134586,
      weight: 0,
      status: 'CANCELED',
      content: [
        {
          type: 'positions',
          id: 0,
          characteristic: {
            type: 'characteristics',
            id: '8d44b432-9353-4d6b-89b8-4591e2f21d02',
            name: 'Стекло для iPhone 11 Pro 10D, Черный',
            product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
            is_new: true,
            is_hit: true,
            is_bestseller: true,
            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
          },
          quantity: 0,
          weight: 0,
          amount: 134586,
          discounted_amount: 0,
          final_amount: 0,
        },
      ],
      history: [
        {
          type: 'order_steps',
          id: 0,
          actor: 'string',
          created: '2023-07-13T11:38:25.821Z',
          status: 'NEW',
        },
      ],
      created: '2023-07-13T11:38:25.821Z',
      updated: '2023-07-13T11:38:25.821Z',
    },
    {
      type: 'orders',
      id: 123342,
      customer: {
        type: 'customers',
        id: 1,
        email: 'ivanov@yandex.ru',
        first_name: 'Иван',
        last_name: 'Иванов',
        company_name: null,
        phone_number: '+79001234567',
        city: null,
        order_amount: '134586.00',
        discount: 0,
        date_joined: '2022-09-21T22:38:40.125043+03:00',
        ext_id: null,
      },
      amount: 134586,
      weight: 0,
      status: 'RECEIVED',
      content: [
        {
          type: 'positions',
          id: 0,
          characteristic: {
            type: 'characteristics',
            id: '8d44b432-9353-4d6b-89b8-4591e2f21d02',
            name: 'Стекло для iPhone 11 Pro 10D, Черный',
            product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
            is_new: true,
            is_hit: true,
            is_bestseller: true,
            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: ['https://hi-stores.ru/upload/iblock/6a0/1kv5pzzka13q4bgoew7a93bylcednbbw.jpg'],
          },
          quantity: 0,
          weight: 0,
          amount: 134586,
          discounted_amount: 0,
          final_amount: 0,
        },
      ],
      history: [
        {
          type: 'order_steps',
          id: 0,
          actor: 'string',
          created: '2023-07-13T11:38:25.821Z',
          status: 'NEW',
        },
      ],
      created: '2023-07-13T11:38:25.821Z',
      updated: '2023-07-13T11:38:25.821Z',
    },
  ],
};

export const OrderItems: FC<IOrderItemsProps> = memo(({ className = '', ...rest }) => {
  const [data, setData] = useState<TOrdersWithPagination | null>(null);
  const [currItem, setCurrItem] = useState<TOrder | null>(null);

  console.log(currItem);

  const { t } = useTranslation();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      const { id } = currentTarget;

      setCurrItem(data?.data.find(item => item.id === +id)!);
    },
    [data],
  );

  useEffect(() => {
    getOrders()
      .then(res => setData(mockData))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <p>loader</p>;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {currItem ? (
        <OrderDetails data={currItem} />
      ) : (
        <>
          <ul className={styles.list}>
            {data.data?.map(item => (
              <ItemOrder key={item.id} data={item} onClick={handleClick} />
            ))}
          </ul>
          <Button kind={EButtonKinds.load} text={t('items.load-btn')} />
          <Pagination className={styles.pagination} amountPage={4} activePage={1} />
        </>
      )}
    </div>
  );
});
