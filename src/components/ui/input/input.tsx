import clsx from 'clsx';
import { forwardRef, HTMLProps, memo } from 'react';

import styles from './input.module.scss';

interface IInput extends HTMLProps<HTMLInputElement> {
  fieldClassName?: string;
}

export const Input = memo(
  forwardRef<HTMLInputElement, IInput>(
    ({ className = '', fieldClassName = '', id, label = '', ...rest }, ref) => (
      <div className={clsx(styles.input_field, fieldClassName)}>
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
  ),
);
