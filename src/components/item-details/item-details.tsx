import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './item-details.module.scss';
import { IItemDetailsProps } from './types';

export const ItemDetails: FC<IItemDetailsProps> = memo(({ className = '', ...rest }) => {
  console.log('q');

  return <template className={clsx(styles.container, className)} {...rest} />;
});
