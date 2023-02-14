import clsx from 'clsx';
import { createElement, FC, HTMLProps, memo } from 'react';

import styles from './title.module.scss';

interface ITitle extends HTMLProps<HTMLTitleElement> {
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

export const Title: FC<ITitle> = memo(
  ({ children, level = ETitleLevel.h3, className = '', ...rest }) =>
    createElement(
      level,
      {
        className: clsx(styles.title, styles[`title_${level}`], className),
        ...rest,
      },
      children,
    ),
);
