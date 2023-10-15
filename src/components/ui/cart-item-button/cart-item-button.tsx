import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { FC, memo, MouseEventHandler, useCallback, useEffect, useState } from 'react';

import styles from './cart-item-button.module.scss';
import { ICartItemButtonProps } from './types';

import { Paragraph } from '../paragraph';

export const CartItemButton: FC<ICartItemButtonProps> = memo(
  ({ max, className = '', amount = 0, handleUpdateInCart, ...rest }) => {
    const [curAmount, setCurAmount] = useState(amount);
    const [cart, setCart] = useState(curAmount);

    const handleFetch = useCallback(
      (val: number) => {
        handleUpdateInCart(val);
      },
      [handleUpdateInCart],
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

    useEffect(() => {
      setCart(amount);
      setCurAmount(amount);
    }, [amount]);

    useEffect(() => {
      if (cart !== curAmount) {
        handleFetchDebounced(curAmount);
      }
    }, [curAmount, handleFetchDebounced, cart]);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <button
          className={clsx(styles.btn, styles.btn_minus)}
          id='minus'
          disabled={curAmount <= 0}
          onClick={handleBtnsClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='11'
            height='11'
            viewBox='0 0 11 11'
            fill='none'
          >
            <line x1='1' y1='4.89258' x2='9' y2='4.89258' stroke='#CDCDCD' strokeWidth='2' />
          </svg>
        </button>
        <Paragraph className={styles.amount}>{curAmount}</Paragraph>
        <button
          className={clsx(styles.btn, styles.btn_plus)}
          id='plus'
          disabled={curAmount >= max}
          onClick={handleBtnsClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='10'
            height='11'
            viewBox='0 0 10 11'
            fill='none'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6 4.89258V0.892578H4V4.89258L0 4.89258V6.89258L4 6.89258V10.8926H6V6.89258L10 6.89258V4.89258L6 4.89258Z'
              fill='#CDCDCD'
            />
          </svg>
        </button>
      </div>
    );
  },
);
