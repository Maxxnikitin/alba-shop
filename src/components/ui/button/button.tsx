import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './button.module.scss';

import { IButtonProps } from './types';

import { MenuIcon } from '../icons';
import { Paragraph } from '../paragraph';

export const Button: FC<IButtonProps> = memo(
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
      {kind === 'menu' && <MenuIcon className={styles.button_icon} />}
      <Paragraph className={clsx(styles.text, { [styles.text_none]: kind === 'menu' })}>
        {text}
      </Paragraph>
    </button>
  ),
);
