import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './button.module.scss';

import { IButtonProps } from './types';

import MenuIcon from '../../../images/icons/menu-icon.svg';
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
      {kind === 'menu' && <img className={styles.button_icon} src={MenuIcon} alt='Иконка.' />}
      <Paragraph className={clsx(styles.text, { [styles.text_none]: kind === 'menu' })}>
        {text}
      </Paragraph>
    </button>
  ),
);
