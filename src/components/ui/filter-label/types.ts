import { HTMLProps } from 'react';

export interface IFilterLabelProps extends HTMLProps<HTMLButtonElement> {
  count: number;
  type?: 'button' | 'submit' | 'reset';
}
