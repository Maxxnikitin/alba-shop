import clsx from 'clsx';
import { FC, memo, MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './order-items.module.scss';

import { IOrderItemsProps } from './types';

import { ItemOrder, OrderDetails } from '..';
import { BackButton, Button, EButtonKinds, Pagination } from '../ui';

import { EOrderStatus, getOrders, TOrder, TOrdersWithPagination } from '~utils';

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
        surname: '',
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
      status: EOrderStatus.NEW,
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

            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: {
              front:
                'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
              left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
              inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
            },
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

            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: {
              front:
                'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
              left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
              inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
            },
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

            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: {
              front:
                'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
              left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
              inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
            },
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

            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: {
              front:
                'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
              left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
              inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
            },
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
        surname: '',
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
      status: EOrderStatus.IN_PROGRESS,
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

            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: {
              front:
                'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
              left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
              inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
            },
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
        surname: 'Иванович',
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
      status: EOrderStatus.READY,
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

            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: {
              front:
                'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
              left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
              inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
            },
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
        surname: '',
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
      status: EOrderStatus.SENT,
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

            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: {
              front:
                'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
              left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
              inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
            },
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
        surname: '',
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
      status: EOrderStatus.CANCELED,
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

            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: {
              front:
                'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
              left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
              inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
            },
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
        surname: 'Иванович',
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
      status: EOrderStatus.RECEIVED,
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

            in_cart: 1,
            in_favorite: true,
            stock: 100,
            price: '110.00',
            discount: 10,
            discounted_price: '99.00',
            color: 'Черный',
            photo: {
              front:
                'https://itechstore.ru/media/images/products/2022/7/0fe4203947ee11ebb2be3cecef20832b_e37732805ad111ebb2be3cecef20832b.jpg',
              left: 'https://iphoriya.ru/wp-content/uploads/apple-silicone-case-iphone-11-vitamin-c.jpeg',
              inside: 'https://img.mvideo.ru/Pdb/50129627b.jpg',
            },
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
  const [pageSize, setPageSize] = useState(18);
  const [currPaginationPage, setCurrPaginationPage] = useState(1);
  const [currItem, setCurrItem] = useState<TOrder | null>(null);
  const [offset, setOffset] = useState(0);

  const { t } = useTranslation();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    ({ currentTarget }) => {
      const { id } = currentTarget;

      setCurrItem(data?.data.find(item => item.id === +id)!);
      setOffset(window.pageYOffset);
    },
    [data],
  );

  const handleBackClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setCurrItem(null);
  }, []);

  const handleLoadMoreClick = useCallback(() => {
    setPageSize(pageSize + 18);
  }, [pageSize]);

  useEffect(() => {
    getOrders()
      .then(res => setData(mockData))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (currItem) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: offset,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [offset, currItem]);

  if (!data) return <p>loader</p>;

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {currItem ? (
        <>
          <BackButton
            text={t('personal-account.order.back')!}
            className={styles.btn_back}
            onClick={handleBackClick}
          />
          <OrderDetails data={currItem} />
        </>
      ) : (
        <>
          <ul className={styles.list}>
            {data.data?.map(item => (
              <ItemOrder key={item.id} data={item} onClick={handleClick} />
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
        </>
      )}
    </div>
  );
});
