import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './brand-item.module.scss';
import { IBrandItemProps } from './types';

export const BrandItem: FC<IBrandItemProps> = memo(({ data, className = '', ...rest }) => {
  console.log('q');

  return (
    <li
      className={clsx(styles.brand, className)}
      style={{ backgroundImage: data.logo }}
      {...rest}
    />
  );
});
