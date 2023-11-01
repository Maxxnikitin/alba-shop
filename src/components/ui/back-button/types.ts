import { HTMLProps } from 'react';

export interface IBackButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  iconClassName?: string;
  textClassName?: string;
}
