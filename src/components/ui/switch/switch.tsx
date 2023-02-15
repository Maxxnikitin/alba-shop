import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './switch.module.scss';
import { ISwitch } from './types';

export const Switch: FC<ISwitch> = memo(
  ({ className = '', boxClassName = '', label, id, ...rest }) => {
    console.log('rr');
    return (
      <div className={clsx(styles.container, boxClassName)} {...rest}>
        <label className={styles.label} htmlFor={id ?? label}>
          {label}
        </label>
        <input className={clsx(styles.input, className)} type='checkbox' id={id ?? label} />
      </div>
    );
  },
);
