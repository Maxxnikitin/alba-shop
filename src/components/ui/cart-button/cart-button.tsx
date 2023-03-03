import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { ChangeEventHandler, FC, memo, MouseEventHandler, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './cart-button.module.scss';
import { ICartButtonProps } from './types';

import { Button } from '../button';
import { ItemsCount } from '../items-count';

export const CartButton: FC<ICartButtonProps> = memo(
  ({ className = '', amount = 1, max, ...rest }) => {
    const [curAmount, setCurAmount] = useState(amount);
    const [cart, setCart] = useState(curAmount);
    const { t } = useTranslation();

    const handleFetch = useCallback((val: number) => setCart(val), []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleFetchDebounced = useCallback(debounce(handleFetch, 2000), [handleFetch]);

    const handleAddToCartCLick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
      setCurAmount(1);
      handleFetch(1);
    }, [handleFetch]);

    const handleBtnsClick: MouseEventHandler<HTMLButtonElement> = useCallback(
      ({ currentTarget }) => {
        const { id } = currentTarget;

        if (id === 'plus') {
          setCurAmount(prev => ++prev);
        } else {
          setCurAmount(prev => --prev);
          if (curAmount === 1) {
            handleFetch(curAmount - 1);
          }
        }
      },
      [curAmount, handleFetch],
    );

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      ({ target }) => {
        const val = +target.value;

        setCurAmount(val > max ? max : val);
        handleFetchDebounced(val);
      },
      [max, handleFetchDebounced],
    );

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <Button
          text={t('item.btn')}
          onClick={handleAddToCartCLick}
          className={clsx(styles.btn, styles.invisible, { [styles.visible]: cart <= 0 })}
        />
        <ItemsCount
          max={max}
          amount={curAmount}
          handleBtnsClick={handleBtnsClick}
          handleInputChange={handleInputChange}
          className={clsx(styles.btn, styles.invisible, { [styles.visible]: cart > 0 })}
        />
      </div>
    );
  },
);
