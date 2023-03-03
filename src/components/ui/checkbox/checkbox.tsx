import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { FC, memo } from 'react';

import styles from './checkbox.module.scss';
import { ICheckboxProps } from './types';

import { Paragraph } from '..';

export const Checkbox: FC<ICheckboxProps> = memo(
  ({ className = '', boxClassName = '', label, id, quantity, ...rest }) => {
    const currId = id ?? nanoid();

    console.log('Render Checkbox');

    return (
      <div className={clsx(styles.container, boxClassName)}>
        <input className={clsx(styles.input, className)} type='checkbox' id={currId} {...rest} />
        <label className={styles.label} htmlFor={currId}>
          {label}
        </label>
        {quantity && (
          <>
            <div className={styles.dotted} />
            <Paragraph className={styles.quantity}>{quantity}</Paragraph>
          </>
        )}
      </div>
    );
  },
);
