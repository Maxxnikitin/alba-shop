import clsx from 'clsx';
import debounce from 'lodash/debounce';
import {
  ChangeEventHandler,
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import styles from './cart-button.module.scss';
import { ICartButtonProps } from './types';

import { Button } from '../button';
import { ItemsCount } from '../items-count';

export const CartButton: FC<ICartButtonProps> = memo(
  ({
    max,
    className = '',
    amount = 0,
    isSmall = false,
    disabled,
    isFetchError,
    setIsFetchError,
    handleAddToCart,
    handleUpdateInCart,
    handleDeleteFromCart,
    ...rest
  }) => {
    const [curAmount, setCurAmount] = useState(amount);
    const [cart, setCart] = useState(curAmount);
    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFetch = useCallback(
      (val: number) => {
        if (val) {
          handleUpdateInCart(val);
        } else {
          handleDeleteFromCart();
        }
        inputRef.current?.blur();
      },
      [handleDeleteFromCart, handleUpdateInCart],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleFetchDebounced = useCallback(debounce(handleFetch, 1000), [handleFetch]);

    const handleBtnsClick: MouseEventHandler<HTMLButtonElement> = useCallback(
      ({ currentTarget }) => {
        const { id } = currentTarget;

        if (id === 'plus') {
          setCurAmount(prev => ++prev);
        } else {
          setCurAmount(prev => --prev);
        }
      },
      [],
    );

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      ({ target }) => {
        const val = +target.value;

        setCurAmount(val > max ? max : val);
      },
      [max],
    );

    useEffect(() => {
      setCart(amount);
      setCurAmount(amount);
    }, [amount]);

    useEffect(() => {
      if (cart !== curAmount) {
        handleFetchDebounced(curAmount);
      }
    }, [curAmount, handleFetchDebounced, cart]);

    useEffect(() => {
      if (isFetchError) {
        setCurAmount(amount);
        setIsFetchError(false);
      }
    }, [isFetchError, amount, setIsFetchError]);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Button
          text={t('item.btn')}
          onClick={handleAddToCart}
          disabled={disabled}
          className={clsx(styles.btn, styles.invisible, {
            [styles.visible]: cart <= 0,
            [styles.small]: isSmall,
          })}
        />
        <ItemsCount
          max={max}
          ref={inputRef}
          amount={curAmount}
          handleBtnsClick={handleBtnsClick}
          handleInputChange={handleInputChange}
          className={clsx(styles.btn, styles.invisible, {
            [styles.visible]: cart > 0,
            [styles.small]: isSmall,
          })}
        />
      </div>
    );
  },
);
