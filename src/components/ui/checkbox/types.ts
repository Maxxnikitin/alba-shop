import { HTMLProps } from 'react';

export interface ICheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'type'> {
  label: string;
  boxClassName?: string;
  quantity?: number;
}
