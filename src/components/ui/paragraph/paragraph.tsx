import clsx from 'clsx';
import { FC, HTMLProps, memo } from 'react';

import styles from './paragraph.module.scss';

interface IParagraph extends HTMLProps<HTMLParagraphElement> {}

export const Paragraph: FC<IParagraph> = memo(({ children, className = '', ...rest }) => (
  <p className={clsx(styles.paragraph, className)} {...rest}>
    {children}
  </p>
));
