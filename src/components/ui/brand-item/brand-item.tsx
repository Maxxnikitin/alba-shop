import clsx from 'clsx';
import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './brand-item.module.scss';
import { IBrandItemProps } from './types';

export const BrandItem: FC<IBrandItemProps> = memo(({ data, className = '', ...rest }) => {
  const { id, name, logo } = data;
  const { t } = useTranslation();

  return (
    <li className={clsx(styles.brand, className)} {...rest}>
      <Link className={styles.link} to={`/brands/${id}_${name}`}>
        <img src={logo} className={styles.img} alt={t('alts.brand')!} />
      </Link>
    </li>
  );
});
