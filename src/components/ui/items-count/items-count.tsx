import clsx from 'clsx';
import { forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './items-count.module.scss';
import { IItemsCountProps } from './types';

import { Input } from '../input';
import { Paragraph } from '../paragraph';

export const ItemsCount = memo(
  forwardRef<HTMLInputElement, IItemsCountProps>(
    (
      { className = '', amount = 1, max, isInCart, handleBtnsClick, handleInputChange, ...rest },
      ref,
    ) => {
      const { t } = useTranslation();

      return (
        <div
          className={clsx(styles.container, className, { [styles.container_cart]: isInCart })}
          {...rest}
        >
          <button
            className={clsx(styles.btn, styles.btn_minus, { [styles.btn_minus_cart]: isInCart })}
            id='minus'
            disabled={amount <= 0}
            onClick={handleBtnsClick}
          />
          <div className={clsx(styles.amount_box, { [styles.amount_box_cart]: isInCart })}>
            <Input
              type='number'
              className={clsx(styles.input, { [styles.input_cart]: isInCart })}
              value={amount?.toString() ?? '0'}
              max={max}
              min={1}
              ref={ref}
              onChange={handleInputChange}
            />
            {!isInCart && <Paragraph className={styles.amount}>{t('item.unit')}</Paragraph>}
          </div>
          <button
            className={clsx(styles.btn, styles.btn_plus, { [styles.btn_plus_cart]: isInCart })}
            id='plus'
            disabled={amount >= max}
            onClick={handleBtnsClick}
          />
        </div>
      );
    },
  ),
);
