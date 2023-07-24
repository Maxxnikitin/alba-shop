import { HTMLProps } from 'react';

export interface IFilterPopupButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
