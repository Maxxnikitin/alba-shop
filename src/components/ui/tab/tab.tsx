import clsx from 'clsx';
import { FC } from 'react';

import styles from './tab.module.scss';
import { ITab } from './types';

export const Tab: FC<ITab> = ({
  type = 'button',
  text,
  isActive = false,
  className = '',
  ...rest
}) => (
  <button
    className={clsx(styles.tab, { [styles.tab_active]: isActive }, className)}
    type={type}
    {...rest}
  >
    {text}
  </button>
);
