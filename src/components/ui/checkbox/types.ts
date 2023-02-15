import { HTMLProps } from 'react';

export interface ICheckbox extends Omit<HTMLProps<HTMLInputElement>, 'type'> {
  label: string;
  boxClassName?: string;
  amount?: number;
}
