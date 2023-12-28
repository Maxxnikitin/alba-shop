import { useStore } from 'effector-react';
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

import {
  $cartCountStore,
  $cartItemsStore,
  getCartItemsFx,
  removeCartFx,
  removeCartItems,
  updateCartCount,
  updateCartItemsFx,
} from 'src/models';
import {
  EDeliveryType,
  TConfirmOrderData,
  createOrder,
  getUser,
  handleScroll,
  handleToggleState,
} from '~utils';

export const CartPage: FC<ICartPageProps> = ({ className = '', ...rest }) => {
  const [mode, setMode] = useState<'cart' | 'confirm'>('cart');
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isCreateOrderSuccess, setIsCreateOrderSuccess] = useState(false);
  const [isRemoveCart, setIsRemoveCart] = useState(false);
  const [removeItem, setRemoveItem] = useState<string | number | null>(null);
  const [orderNum, setOrderNum] = useState<number | null>(null);
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

  const cartCount = useStore($cartCountStore);
  const { status, data } = useStore($cartItemsStore);

  const handleConfirmCart = useCallback(() => {
    setMode('confirm');
    handleScroll();
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
        .then(({ data }) => {
          setIsCreateOrderSuccess(true);
          updateCartCount(0);
          setOrderNum(data.id);
        })
        .catch(err => {
          setIsRequestError(true);
          console.log(err);
        });
    },
    [editData],
  );

  const handleBackClick = useCallback(() => {
    setMode('cart');
    setIsRequestError(false);
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

  const handleRemoveCart: MouseEventHandler<HTMLButtonElement> = async () => {
    if (isRemoveCart) {
      await removeCartFx();
      setIsRemoveCart(false);
    } else {
      setIsRemoveCart(true);
    }
  };

  const handleRemoveItem: MouseEventHandler<HTMLButtonElement> = async ({ currentTarget }) => {
    if (removeItem) {
      await updateCartItemsFx({ characteristic_id: removeItem.toString(), quantity: 0 });
      setRemoveItem(null);
    } else {
      setRemoveItem(currentTarget.id);
    }
  };

  const handleCloseRemoveItemModal = useCallback(() => {
    setRemoveItem(null);
  }, []);

  useEffect(() => {
    getCartItemsFx();
    getUser()
      .then(({ data: userData }) => {
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
      .catch(err => console.log(err));

    return () => removeCartItems();
  }, []);

  if (!data) return null;

  return (
    <section className={styles.container} {...rest}>
      {mode === 'cart' ? (
        data.data ? (
          <CartTable
            handleRemoveCart={handleRemoveCart}
            handleRemoveItem={handleRemoveItem}
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
          isRequestError={isRequestError}
          price={+(data?.data?.final_amount || 0)}
        />
      )}
      <ModalConfirmedOrder isOpen={isCreateOrderSuccess} orderNum={orderNum} />
      <ModalSmall
        title={t('modals.cart.removeCart.title')!}
        text={t('modals.cart.removeCart.text', { amount: cartCount })!}
        isOpen={isRemoveCart}
        successBtnText={t('modals.cart.removeCart.btn_success')!}
        cancellBtnText={t('modals.cart.removeCart.btn_cancel')!}
        onClose={handleToggleState(setIsRemoveCart)}
        onSuccess={handleRemoveCart}
        withCloseBtn
        isBtnDisabled={status === 'LOADING'}
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
        isBtnDisabled={status === 'LOADING'}
      />
    </section>
  );
};
