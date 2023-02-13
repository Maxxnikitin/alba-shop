import clsx from 'clsx';
import { FC, HTMLProps, memo } from 'react';

import styles from './button.module.scss';

import MenuIcon from '../../../images/icons/menu-icon.svg';

interface IButton extends HTMLProps<HTMLButtonElement> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  kind?:
    | 'primary'
    | 'secondary'
    | 'menu'
    | 'addition'
    | 'load'
    | 'item-missing'
    | 'sign-in'
    | 'delay';
}

export const Button: FC<IButton> = memo(
  ({ text, type = 'button', kind = 'primary', className = '', ...rest }) => (
    <button
      className={clsx(
        styles.button,
        {
          [styles[`button_type_${kind}`]]: kind,
        },
        className,
      )}
      type={type}
      {...rest}
    >
      {kind === 'menu' && <img className={styles.button_icon} src={MenuIcon} alt='Иконка.' />}
      {text}
    </button>
  ),
);
