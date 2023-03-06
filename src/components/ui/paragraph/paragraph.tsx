import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './paragraph.module.scss';
import { IParagraphProps } from './types';

export const Paragraph: FC<IParagraphProps> = memo(
  ({ children, className = '', isError = false, isGradient = false, ...rest }) => (
    <p
      className={clsx(
        styles.paragraph,
        { [styles.error]: isError, [styles.gradient]: isGradient },
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  ),
);
