import clsx from 'clsx';
import { FC, HTMLProps, memo } from 'react';

import styles from './paragraph.module.scss';

interface IParagraph extends HTMLProps<HTMLParagraphElement> {
  text: string;
}

export const Paragraph: FC<IParagraph> = memo(({ text, className = '', ...rest }) => (
  <p className={clsx(styles.paragraph, className)} {...rest}>
    {text}
  </p>
));
