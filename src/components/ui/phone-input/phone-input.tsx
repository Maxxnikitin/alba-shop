import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './phone-input.module.scss';
import { IPhoneInputProps } from './types';

export const PhoneInput = forwardRef<HTMLInputElement, IPhoneInputProps>(
  ({ className = '', id, type = 'tel', placeholder = '(999) 999-99-99', ...rest }, ref) => (
    <input
      className={clsx(styles.input, className)}
      id={id}
      ref={ref}
      type={type}
      placeholder={placeholder}
      {...rest}
    />
  ),
);
