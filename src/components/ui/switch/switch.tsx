import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { FC, memo } from 'react';

import styles from './switch.module.scss';
import { ISwitch } from './types';

export const Switch: FC<ISwitch> = memo(
  ({ className = '', boxClassName = '', label, id, ...rest }) => {
    const currId = id ?? nanoid();
    console.log('Render Switch');

    return (
      <div className={clsx(styles.container, boxClassName)}>
        <label className={styles.label} htmlFor={currId}>
          {label}
        </label>
        <input className={clsx(styles.input, className)} type='checkbox' id={currId} {...rest} />
      </div>
    );
  },
);
