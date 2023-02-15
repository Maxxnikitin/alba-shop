import { HTMLProps } from 'react';

export interface ISwitch extends Omit<HTMLProps<HTMLInputElement>, 'type'> {
  label: string;
  boxClassName?: string;
}
