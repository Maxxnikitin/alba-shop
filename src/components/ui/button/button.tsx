import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './button.module.scss';

import { IButtonProps } from './types';

import { MenuCloseIcon, MenuIcon } from '../icons';
import { Paragraph } from '../paragraph';

export const Button: FC<IButtonProps> = memo(
  ({
    text,
    type = 'button',
    kind = 'primary',
    isMenuOpen,
    isLoading,
    disabled,
    className = '',
    ...rest
  }) => (
    <button
      className={clsx(
        styles.button,
        {
          [styles[`button_type_${kind}`]]: kind,
        },
        className,
      )}
      type={type}
      disabled={disabled || isLoading}
      {...rest}
    >
      {kind === 'menu' &&
        (isMenuOpen ? (
          <MenuCloseIcon className={styles.button_icon} />
        ) : (
          <MenuIcon className={styles.button_icon} />
        ))}
      <Paragraph className={clsx(styles.text, { [styles.text_none]: kind === 'menu' })}>
        {text}
      </Paragraph>
    </button>
  ),
);
