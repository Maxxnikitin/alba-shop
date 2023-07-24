import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { FC, memo } from 'react';

import styles from './radio.module.scss';
import { IRadioProps } from './types';

export const Radio: FC<IRadioProps> = memo(
  ({ className = '', boxClassName = '', labelClassName = '', label, id, ...rest }) => {
    const currId = id ?? nanoid();

    return (
      <div className={clsx(styles.container, boxClassName)}>
        <input className={clsx(styles.input, className)} type='radio' id={currId} {...rest} />
        <label className={clsx(styles.label, labelClassName)} htmlFor={currId}>
          {label}
        </label>
      </div>
    );
  },
);
