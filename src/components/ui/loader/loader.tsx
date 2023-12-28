import clsx from 'clsx';
import { FC } from 'react';

import styles from './loader.module.scss';
import { ILoaderProps } from './types';

export const Loader: FC<ILoaderProps> = ({ size = 'm', withOverlay, className = '', ...rest }) => (
  <>
    <div
      className={clsx(styles.loader, className, styles[size], {
        [styles.loader_full]: withOverlay,
      })}
      {...rest}
    />
    {withOverlay && <div className={styles.overlay} />}
  </>
);
