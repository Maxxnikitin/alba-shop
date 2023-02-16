import { HTMLProps } from 'react';

export interface ITab extends HTMLProps<HTMLButtonElement> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  isActive?: boolean;
}
