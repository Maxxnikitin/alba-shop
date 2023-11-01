import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './count.module.scss';
import { ICountProps } from './types';

import { Paragraph } from '../paragraph';

export const Count: FC<ICountProps> = memo(({ className = '', count, ...rest }) => (
  <div className={clsx(styles.container, className)} {...rest}>
    <Paragraph className={styles.text}>{count}</Paragraph>
  </div>
));
