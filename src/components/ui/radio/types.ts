import { HTMLProps } from 'react';

export interface IRadioProps extends Omit<HTMLProps<HTMLInputElement>, 'type'> {
  label: string;
  boxClassName?: string;
  labelClassName?: string;
}
