import clsx from 'clsx';
import { FC, HTMLProps } from 'react';

import styles from './tab.module.scss';

interface ITab extends HTMLProps<HTMLButtonElement> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  isActive?: boolean;
}

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
