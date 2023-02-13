import clsx from 'clsx';
import { FC, HTMLProps } from 'react';

import styles from './paragraph.module.scss';

interface IParagraph extends HTMLProps<HTMLParagraphElement> {
  text: string;
}

export const Paragraph: FC<IParagraph> = ({ text, className = '', ...rest }) => (
  <p className={clsx(styles.paragraph, className)}>{text}</p>
);
