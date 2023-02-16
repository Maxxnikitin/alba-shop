import clsx from 'clsx';
import { FC } from 'react';

import styles from './template.module.scss';
import { ITemplate } from './types';

export const Template: FC<ITemplate> = ({ className = '', ...rest }) => {
  console.log('q');

  return <template className={clsx(styles.container, className)} {...rest} />;
};
