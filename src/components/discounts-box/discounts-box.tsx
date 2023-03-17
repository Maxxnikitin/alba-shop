import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import styles from './discounts-box.module.scss';
import { IDiscountsBoxProps } from './types';

import { ArrowLinkIcon, DiscountItem, EDiscounts, Paragraph, Title } from '../ui';

export const DiscountsBox: FC<IDiscountsBoxProps> = memo(({ className = '', ...rest }) => {
  const { t } = useTranslation();

  const itemsList: EDiscounts[] = [15, 25, 40];

  return (
    <section className={clsx(styles.container, className)} {...rest}>
      <Title className={styles.title}>{t('discount.title')}</Title>
      <Link to={`/discount`} className={styles.link}>
        <Paragraph className={styles.text}>
          {t('discount.link')} <ArrowLinkIcon className={styles.icon} />
        </Paragraph>
      </Link>
      <div className={styles.items_box}>
        {itemsList.map(item => (
          <DiscountItem key={item} amount={item} />
        ))}
      </div>
    </section>
  );
});
