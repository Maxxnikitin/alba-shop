import { HTMLProps } from 'react';

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  kind?: EButtonKinds;
}

export enum EButtonKinds {
  primary = 'primary',
  secondary = 'secondary',
  menu = 'menu',
  addition = 'addition',
  load = 'load',
  itemMissing = 'item-missing',
  signIn = 'sign-in',
  delay = 'delay',
}
