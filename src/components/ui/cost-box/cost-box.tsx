import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';

import styles from './cost-box.module.scss';
import { ICostBoxProps } from './types';

import { Title, Paragraph, Tag } from '..';

export const CostBox: FC<ICostBoxProps> = memo(
  ({ className = '', price, discount, discountedPrice, size = 'small', ...rest }) => {
    const displayPrice = useMemo(() => {
      const [priceWithoutPenny] = price.split('.');
      return priceWithoutPenny;
    }, [price]);

    const displayDiscountedPrice = useMemo(() => {
      const [priceWithoutPenny] = discountedPrice.split('.');
      return priceWithoutPenny;
    }, [discountedPrice]);

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        {discount ? (
          <>
            <Title className={clsx(styles.cost, { [styles.cost_small]: size === 'small' })}>
              {displayDiscountedPrice} ₽
            </Title>
            <Paragraph
              className={clsx(styles.cost_prev, { [styles.cost_prev_small]: size === 'small' })}
            >
              {displayPrice} ₽
            </Paragraph>
            <Tag
              className={clsx({ [styles.tag_small]: size === 'small' })}
              text={size === 'small' ? '%' : `-${discount}%`}
            />
          </>
        ) : (
          <Title className={clsx(styles.cost, { [styles.cost_small]: size === 'small' })}>
            {displayPrice} ₽
          </Title>
        )}
      </div>
    );
  },
);
