import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';

import styles from './cost-box.module.scss';
import { ICostBoxProps } from './types';

import { Title, Paragraph, Tag } from '..';

export const CostBox: FC<ICostBoxProps> = memo(({ className = '', price, discount, ...rest }) => {
  const displayDiscount = useMemo(() => {
    const [discountWithoutPenny] = discount.split('.');
    return +discountWithoutPenny;
  }, [discount]);

  const displayPrice = useMemo(() => {
    const [priceWithoutPenny] = price.split('.');
    const priceToNum = +priceWithoutPenny;

    return Math.floor(priceToNum - (priceToNum / 100) * displayDiscount);
  }, [price, displayDiscount]);

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.cost}>{displayPrice} ₽</Title>
      {displayDiscount ? (
        <>
          <Paragraph className={styles.cost_prev}>{price}</Paragraph>
          <Tag text={`-${displayDiscount}%`} />
        </>
      ) : null}
    </div>
  );
});
