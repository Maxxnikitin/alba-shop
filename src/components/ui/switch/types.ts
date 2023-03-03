import { HTMLProps } from 'react';

export interface ISwitchProps extends Omit<HTMLProps<HTMLInputElement>, 'type'> {
  label: string;
  boxClassName?: string;
}
