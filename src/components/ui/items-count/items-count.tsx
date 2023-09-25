import clsx from 'clsx';
import { FC, forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './items-count.module.scss';
import { IItemsCountProps } from './types';

import { Input } from '../input';
import { Paragraph } from '../paragraph';

export const ItemsCount = memo(
  forwardRef<HTMLInputElement, IItemsCountProps>(
    ({ className = '', amount = 1, max, handleBtnsClick, handleInputChange, ...rest }, ref) => {
      const { t } = useTranslation();

      return (
        <div className={clsx(styles.container, className)} {...rest}>
          <button
            className={clsx(styles.btn, styles.btn_minus)}
            id='minus'
            disabled={amount <= 0}
            onClick={handleBtnsClick}
          />
          <div className={styles.amount_box}>
            <Input
              type='number'
              className={styles.input}
              value={amount?.toString() ?? '0'}
              max={max}
              min={1}
              ref={ref}
              onChange={handleInputChange}
            />
            <Paragraph className={styles.amount}>{t('item.unit')}</Paragraph>
          </div>
          <button
            className={clsx(styles.btn, styles.btn_plus)}
            id='plus'
            disabled={amount >= max}
            onClick={handleBtnsClick}
          />
        </div>
      );
    },
  ),
);
