import { ChangeEventHandler, FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import styles from './cart-page.module.scss';
import { ICartPageProps } from './types';

import {
  CartConfirm,
  CartTable,
  EmptyCart,
  ModalConfirmedOrder,
  ModalSmall,
} from '../../components';

import {
  EDeliveryType,
  TCart,
  TConfirmOrderData,
  createOrder,
  getCart,
  getUser,
  handleToggleState,
  removeCart,
  removeCartItem,
} from '~utils';

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
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCreateOrderSuccess, setIsCreateOrderSuccess] = useState(false);
  const [isRemoveCart, setIsRemoveCart] = useState(false);
  const [removeItem, setRemoveItem] = useState<string | number | null>(null);
  const [editData, setEditData] = useState<TConfirmOrderData>({
    first_name: '',
    last_name: '',
    surname: '',
    city: '',
    phone_number: '',
    email: '',
    delivery: EDeliveryType.PICKUP,
  });

  const { t } = useTranslation();

  const handleConfirmCart = useCallback(() => {
    setMode('confirm');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleCreateOrder = useCallback(() => {
    if (editData.phone_number.length !== 12) {
      setIsPhoneError(true);
      return;
    }

    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/;

    if (!editData.email.match(regex)) {
      setIsEmailError(true);
      return;
    }

    createOrder(editData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .finally(() => setIsCreateOrderSuccess(true));
  }, [editData]);

  const handleBackClick = useCallback(() => {
    setMode('cart');
  }, []);

  const handleChangePhone = (v: string | undefined) => {
    setIsPhoneError(false);
    setEditData(prev => ({
      ...prev,
      phone_number: v ?? '',
    }));
  };

  const handleChangeInputs: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    const { name } = e.target;
    setIsEmailError(false);

    if (name === 'delivery') {
      setEditData(prev => ({
        ...prev,
        [name]: e.target.value as EDeliveryType,
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  }, []);

  const handleRemoveCart: MouseEventHandler<HTMLButtonElement> = () => {
    if (isRemoveCart) {
      removeCart()
        .then(() => {
          setIsRemoveCart(false);
          setData(null);
        })
        .catch(err => console.log(err));
      setData(null);
    } else {
      setIsRemoveCart(true);
    }
  };

  const handleRemoveItem: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    if (removeItem) {
      removeCartItem(removeItem)
        .then(() => {
          setRemoveItem(null);
          setData(null);
        })
        .catch(err => console.log(err));
    } else {
      setRemoveItem(currentTarget.id);
    }
  };

  const handleCloseRemoveItemModal = useCallback(() => {
    setRemoveItem(null);
  }, []);

  useEffect(() => {
    Promise.all([getCart(), getUser()])
      .then(([cartData, userData]) => {
        setData(mockData);
        setEditData({
          first_name: userData.data.first_name,
          last_name: userData.data.last_name,
          surname: '',
          city: userData.data.city || '',
          phone_number: userData.data.phone_number,
          email: userData.data.email,
          delivery: EDeliveryType.PICKUP,
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <section className={styles.container} {...rest}>
      {mode === 'cart' ? (
        data ? (
          <CartTable
            handleRemoveCart={handleRemoveCart}
            handleRemoveItem={handleRemoveItem}
            data={data}
            onClick={handleConfirmCart}
          />
        ) : (
          <EmptyCart />
        )
      ) : (
        <CartConfirm
          data={editData}
          handleChangeInputs={handleChangeInputs}
          handleChangePhone={handleChangePhone}
          handleBackClick={handleBackClick}
          handleCreateOrder={handleCreateOrder}
          isPhoneError={isPhoneError}
          isEmailError={isEmailError}
          price={data?.final_amount || 0}
        />
      )}
      <ModalConfirmedOrder isOpen={isCreateOrderSuccess} />
      <ModalSmall
        title={t('modals.cart.removeCart.title')!}
        text={t('modals.cart.removeCart.text', { amount: 10 })!}
        isOpen={isRemoveCart}
        successBtnText={t('modals.cart.removeCart.btn_success')!}
        cancellBtnText={t('modals.cart.removeCart.btn_cancel')!}
        onClose={handleToggleState(setIsRemoveCart)}
        onSuccess={handleRemoveCart}
        withCloseBtn
      />
      <ModalSmall
        title={t('modals.cart.removeItem.title')!}
        text={t('modals.cart.removeItem.text', { amount: 10 })!}
        isOpen={!!removeItem}
        successBtnText={t('modals.cart.removeItem.btn_success')!}
        cancellBtnText={t('modals.cart.removeItem.btn_cancel')!}
        onClose={handleCloseRemoveItemModal}
        onSuccess={handleRemoveItem}
        withCloseBtn
      />
    </section>
  );
};
