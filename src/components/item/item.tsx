import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './item.module.scss';
import { IItemProps } from './types';

export const Item: FC<IItemProps> = memo(({ className = '', ...rest }) => {
  console.log('q');

  return <template className={clsx(styles.container, className)} {...rest} />;
});
