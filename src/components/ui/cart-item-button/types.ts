import { HTMLProps } from 'react';

export interface ICartItemButtonProps extends HTMLProps<HTMLDivElement> {
  max: number;
  handleUpdateInCart: (val: number) => void;
  // handleDeleteFromCart: () => void;
  amount?: number;
}
