import { HTMLProps } from 'react';

export interface IMenuMainItemProps extends HTMLProps<HTMLButtonElement> {
  text: string;
  icon: string;
  isOpen?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
