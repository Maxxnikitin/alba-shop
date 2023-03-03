import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { forwardRef, memo } from 'react';

import styles from './input.module.scss';

import { IInputProps } from './types';

import { Paragraph } from '..';

export const Input = memo(
  forwardRef<HTMLInputElement, IInputProps>(
    (
      {
        className = '',
        fieldClassName = '',
        id,
        label = '',
        errorText = '',
        kind = 'main',
        isError = false,
        ...rest
      },
      ref,
    ) => {
      const currId = id ?? nanoid();

      return (
        <div className={clsx(styles.input_field, fieldClassName)}>
          <input
            className={clsx(
              styles.input,
              {
                [styles.extratop]: label,
                [styles.input_error]: isError,
                [styles.small]: kind === 'small',
              },
              className,
            )}
            id={currId}
            ref={ref}
            {...rest}
          />
          {label && (
            <label className={styles.label} htmlFor={currId}>
              {label}
            </label>
          )}
          {errorText && (
            <Paragraph className={styles.error} isError>
              {errorText}
            </Paragraph>
          )}
        </div>
      );
    },
  ),
);
