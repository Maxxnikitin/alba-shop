import { HTMLProps } from 'react';

export interface ITabProps extends HTMLProps<HTMLButtonElement> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  isActive?: boolean;
}
