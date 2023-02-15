import clsx from 'clsx';
import { FC } from 'react';

import styles from './checkbox.module.scss';
import { ICheckbox } from './types';

import { Paragraph } from '..';

export const Checkbox: FC<ICheckbox> = ({
  className = '',
  boxClassName = '',
  label,
  id = label,
  amount,
  ...rest
}) => {
  console.log('rr');
  return (
    <div className={clsx(styles.container, boxClassName)} {...rest}>
      <input className={clsx(styles.input, className)} type='checkbox' id={id} />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {amount && (
        <>
          <div className={styles.dotted} />
          <Paragraph className={styles.amount}>{amount}</Paragraph>
        </>
      )}
    </div>
  );
};
