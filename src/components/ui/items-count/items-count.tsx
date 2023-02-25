import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './items-count.module.scss';
import { IItemsCountProps } from './types';

import { Input } from '../input';
import { Paragraph } from '../paragraph';

export const ItemsCount: FC<IItemsCountProps> = memo(
  ({ className = '', amount = 1, max, handleBtnsClick, handleInputChange, ...rest }) => {
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
            value={amount}
            max={max}
            min={1}
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
);
