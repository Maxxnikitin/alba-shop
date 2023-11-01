import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './template.module.scss';
import { ITemplateProps } from './types';

export const Template: FC<ITemplateProps> = memo(({ className = '', ...rest }) => (
  <template className={clsx(styles.container, className)} {...rest} />
));
