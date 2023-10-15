import clsx from 'clsx';
import { FC } from 'react';

import styles from './loader.module.scss';
import { ILoaderProps } from './types';

export const Loader: FC<ILoaderProps> = ({ className = '', ...rest }) => (
  <div className={clsx(styles.loader, className)} {...rest} />
);
