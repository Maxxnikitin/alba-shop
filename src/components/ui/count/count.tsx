import clsx from 'clsx';
import { FC, memo, useMemo } from 'react';

import styles from './count.module.scss';
import { ICountProps } from './types';

import { Paragraph } from '../paragraph';

export const Count: FC<ICountProps> = memo(({ className = '', count, ...rest }) => {
  const displayCount = useMemo(() => (count <= 99 ? count : 99), [count]);

  return (
    <div className={clsx(styles.container, className)} {...rest}>
      <Paragraph className={styles.text}>{displayCount}</Paragraph>
    </div>
  );
});
