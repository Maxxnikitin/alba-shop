import clsx from 'clsx';
import { forwardRef, memo } from 'react';

import styles from './input.module.scss';

import { IInput } from './types';

import { Paragraph } from '..';

export const Input = memo(
  forwardRef<HTMLInputElement, IInput>(
    (
      {
        className = '',
        fieldClassName = '',
        id,
        label = '',
        errorText = '',
        isError = false,
        ...rest
      },
      ref,
    ) => (
      <div className={clsx(styles.input_field, fieldClassName)}>
        <input
          className={clsx(
            styles.input,
            { [styles.extratop]: label, [styles.input_error]: isError },
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
        {errorText && (
          <Paragraph className={styles.error} isError>
            {errorText}
          </Paragraph>
        )}
      </div>
    ),
  ),
);
