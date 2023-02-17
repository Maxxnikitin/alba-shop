import clsx from 'clsx';
import { createElement, FC, memo } from 'react';

import styles from './title.module.scss';
import { ETitleLevel, ITitleProps } from './types';

export const Title: FC<ITitleProps> = memo(
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
