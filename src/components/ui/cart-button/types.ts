import { HTMLProps, MouseEventHandler } from 'react';

export interface ICartButtonProps extends HTMLProps<HTMLDivElement> {
  max: number;
  handleAddToCart: MouseEventHandler<HTMLButtonElement>;
  handleUpdateInCart: (val: number) => void;
  handleDeleteFromCart: () => void;
  isSmall?: boolean;
  amount?: number;
}
