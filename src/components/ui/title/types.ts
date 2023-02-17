import { HTMLProps } from 'react';

export interface ITitleProps extends HTMLProps<HTMLTitleElement> {
  level?: ETitleLevel;
}

export enum ETitleLevel {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}
