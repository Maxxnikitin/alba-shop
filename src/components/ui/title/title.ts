import clsx from 'clsx';
import { createElement, FC, HTMLProps } from 'react';

import styles from './title.module.scss';

interface ITitle extends HTMLProps<HTMLTitleElement> {
  text: string;
  level?: ETitleLevel;
}

enum ETitleLevel {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export const Title: FC<ITitle> = ({ text, level = ETitleLevel.h3, className = '', ...rest }) =>
  createElement(
    level,
    {
      className: clsx(styles.title, styles[`title_${level}`], className),
      ...rest,
    },
    text,
  );
