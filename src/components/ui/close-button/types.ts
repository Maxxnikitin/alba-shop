import { HTMLProps } from 'react';

export interface ICloseButton extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  textClassName?: string;
}
