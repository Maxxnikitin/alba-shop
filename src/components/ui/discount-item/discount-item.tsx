import clsx from 'clsx';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './discount-item.module.scss';
import { IDiscountItemProps } from './types';

import { Paragraph, ArrowLink, ArrowLinkGradient } from '..';

export const DiscountItem: FC<IDiscountItemProps> = memo(({ amount, className = '', ...rest }) => {
  const { t } = useTranslation();
  console.log('q');

  return (
    <Link
      className={clsx(styles.container, styles[`container_${amount}`], className)}
      to={`/discount/${amount}`}
      {...rest}
    >
      <Paragraph isGradient={amount === 40} className={clsx(styles.text, styles[`text_${amount}`])}>
        {t('discount.text')}
      </Paragraph>
      <Paragraph
        isGradient={amount === 40}
        className={clsx(styles.text, styles[`text_${amount}`], styles.text_percent)}
      >{`${amount}%`}</Paragraph>
      <div className={styles.link}>
        <Paragraph
          isGradient={amount === 40}
          className={clsx(styles.text, styles[`text_${amount}`], styles.text_link)}
        >
          {t('discount.link-item')}
        </Paragraph>
        {amount === 40 ? (
          <ArrowLinkGradient className={clsx(styles.icon, styles[`icon_${amount}`])} />
        ) : (
          <ArrowLink className={clsx(styles.icon, styles[`icon_${amount}`])} />
        )}
      </div>
    </Link>
  );
});
