import { HTMLProps } from 'react';

export interface ICartButtonProps extends HTMLProps<HTMLDivElement> {
  max: number;
  isSmall?: boolean;
  amount?: number;
}
