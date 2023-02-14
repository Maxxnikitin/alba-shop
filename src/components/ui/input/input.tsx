import clsx from 'clsx';
import { forwardRef, memo } from 'react';

import styles from './input.module.scss';

import { IInput } from './types';

import { Paragraph } from '..';

export const Input = memo(
  forwardRef<HTMLInputElement, IInput>(
    ({ className = '', fieldClassName = '', id, label = '', errorText = '', ...rest }, ref) => (
      <div className={clsx(styles.input_field, fieldClassName)}>
        {errorText && <Paragraph className={styles.error}>{errorText}</Paragraph>}
        <input
          className={clsx(
            styles.input,
            { [styles.extratop]: label, [styles.input_error]: errorText },
            className,
          )}
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
