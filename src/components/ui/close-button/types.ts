import { HTMLProps } from 'react';

export interface ICloseButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  textClassName?: string;
}
