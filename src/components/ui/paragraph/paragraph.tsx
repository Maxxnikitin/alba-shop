import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './paragraph.module.scss';
import { IParagraph } from './types';

export const Paragraph: FC<IParagraph> = memo(({ children, className = '', ...rest }) => (
  <p className={clsx(styles.paragraph, className)} {...rest}>
    {children}
  </p>
));
