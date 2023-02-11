import clsx from 'clsx';
import { forwardRef, HTMLProps } from 'react';

import styles from './input.module.scss';

interface IInput extends HTMLProps<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className = '', id, label = '', ...rest }, ref) => (
    <div className={styles.input_field}>
      <input
        className={clsx(styles.input, { [styles.extratop]: label }, className)}
        id={id}
        ref={ref}
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
