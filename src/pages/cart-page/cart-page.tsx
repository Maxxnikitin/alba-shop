import { FC, useCallback, useEffect, useState } from 'react';

import styles from './cart-page.module.scss';
import { ICartPageProps } from './types';

import { CartConfirm, CartTable } from '../../components';

import { TCart, getCart } from '~utils';

const mockData: TCart = {
  type: 'carts',
  id: 0,
  customer: {
    type: 'customers',
    id: 1,
    email: 'ivanov@yandex.ru',
    first_name: 'Иван',
    last_name: 'Иванов',
    company_name: null,
    phone_number: '+79001234567',
    city: null,
    order_amount: '0.00',
    discount: 0,
    date_joined: '2022-09-21T22:38:40.125043+03:00',
    ext_id: null,
  },
  created: '2023-07-18T08:18:17.891Z',
  amount: 0,
  discounted_amount: 0,
  final_amount: 0,
  weight: 0,
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
        is_bestseller: true,
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
      amount: 0,
      discounted_amount: 0,
      final_amount: 0,
    },
    {
      type: 'positions',
      id: 1,
      characteristic: {
        type: 'characteristics',
        id: '8d44b432-9353-4d6b-89b8-4591e2f21d02',
        name: 'Стекло для iPhone 11 Pro 10D, Черный',
        product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
        is_new: true,
        is_hit: true,
        in_cart: 1,
        in_favorite: true,
        is_bestseller: true,
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
      amount: 0,
      discounted_amount: 0,
      final_amount: 0,
    },
    {
      type: 'positions',
      id: 2,
      characteristic: {
        type: 'characteristics',
        id: '8d44b432-9353-4d6b-89b8-4591e2f21d02',
        name: 'Стекло для iPhone 11 Pro 10D, Черный',
        product_id: '8d44b432-9353-4d6b-89b8-4591e2f21d01',
        is_new: true,
        is_hit: true,
        in_cart: 1,
        in_favorite: true,
        is_bestseller: true,
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
      amount: 0,
      discounted_amount: 0,
      final_amount: 0,
    },
  ],
};

export const CartPage: FC<ICartPageProps> = ({ className = '', ...rest }) => {
  const [data, setData] = useState<TCart | null>(null);
  const [mode, setMode] = useState<'cart' | 'confirm'>('cart');

  const handleConfirmCart = useCallback(() => {
    setMode('confirm');
  }, []);

  useEffect(() => {
    getCart()
      .then(res => setData(mockData))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className={styles.container} {...rest}>
      {mode === 'cart' ? (
        data ? (
          <CartTable data={data} onClick={handleConfirmCart} />
        ) : (
          <p>empty</p>
        )
      ) : (
        <CartConfirm price={data?.final_amount || 0} />
      )}
    </section>
  );
};
