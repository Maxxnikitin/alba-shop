import clsx from 'clsx';
import { forwardRef, HTMLProps } from 'react';

import styles from './input.module.scss';

interface IInput extends HTMLProps<HTMLInputElement> {
  fieldClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className = '', fieldClassName = '', id, label = '', type = 'text', ...rest }, ref) => (
    <div className={clsx(styles.input_field, fieldClassName)}>
      <input
        className={clsx(styles.input, { [styles.extratop]: label }, className)}
        id={id}
        ref={ref}
        type={type}
        {...rest}
      />
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  ),
);
