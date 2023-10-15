import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

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

import { updateCartCount } from 'src/models';
import {
  EDeliveryType,
  TCart,
  TConfirmOrderData,
  createOrder,
  getCart,
  getCartCount,
  getUser,
  handleToggleState,
  removeCart,
  updateCartPositionInCart,
} from '~utils';

export const CartPage: FC<ICartPageProps> = ({ className = '', ...rest }) => {
  const [data, setData] = useState<TCart | null>(null);
  const [mode, setMode] = useState<'cart' | 'confirm'>('cart');
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCreateOrderSuccess, setIsCreateOrderSuccess] = useState(false);
  const [isRemoveCart, setIsRemoveCart] = useState(false);
  const [removeItem, setRemoveItem] = useState<string | number | null>(null);
  const [orderNum, setOrderNum] = useState<number | null>(null);
  const [isCartLoading, setIsCartloading] = useState(true);
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

  const handleCreateOrder: FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();

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
        .then(({ data }) => setOrderNum(data.id))
        .catch(err => console.log(err))
        .finally(() => setIsCreateOrderSuccess(true));
    },
    [editData],
  );

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
          getCartCount().then(({ data }) => updateCartCount(data.total_items));
        })
        .catch(err => console.log(err));
    } else {
      setIsRemoveCart(true);
    }
  };

  const handleRemoveItem: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => {
    if (removeItem) {
      updateCartPositionInCart({ characteristic_id: removeItem.toString(), quantity: 0 })
        .then(({ data }) => {
          setData(data);
          getCartCount().then(({ data }) => updateCartCount(data.total_items));
        })
        .catch(err => console.log(err))
        .finally(() => setRemoveItem(null));
    } else {
      setRemoveItem(currentTarget.id);
    }
  };

  const handleCloseRemoveItemModal = useCallback(() => {
    setRemoveItem(null);
  }, []);

  useEffect(() => {
    Promise.all([getCart(), getUser()])
      .then(([{ data: cartData }, { data: userData }]) => {
        setData(cartData);
        setEditData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          surname: '',
          city: userData.city || '',
          phone_number: userData.phone_number,
          email: userData.email,
          delivery: EDeliveryType.PICKUP,
        });
      })
      .catch(err => console.log(err))
      .finally(() => setIsCartloading(false));
  }, []);

  if (isCartLoading) return <p>loading</p>;

  return (
    <section className={styles.container} {...rest}>
      {mode === 'cart' ? (
        data ? (
          <CartTable
            handleRemoveCart={handleRemoveCart}
            handleRemoveItem={handleRemoveItem}
            data={data}
            setData={setData}
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
      <ModalConfirmedOrder isOpen={isCreateOrderSuccess} orderNum={orderNum} />
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
