import clsx from 'clsx';
import { FC, memo } from 'react';

import { Link } from 'react-router-dom';

import styles from './brand-item.module.scss';
import { IBrandItemProps } from './types';

export const BrandItem: FC<IBrandItemProps> = memo(({ data, className = '', ...rest }) => {
  console.log('q');

  return (
    <li className={clsx(styles.brand, className)} {...rest}>
      <Link
        className={styles.link}
        style={{ backgroundImage: `url(${data.logo})` }}
        to={data.name}
      />
    </li>
  );
});
