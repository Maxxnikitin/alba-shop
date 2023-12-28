import { HTMLProps, MouseEventHandler } from 'react';

export interface ICartButtonProps extends HTMLProps<HTMLDivElement> {
  max: number;
  handleUpdateInCart: (val: number) => void;
  handleDeleteFromCart: () => void;
  handleAddToCart?: MouseEventHandler<HTMLButtonElement>;
  isSmall?: boolean;
  amount?: number;
  isInCart?: boolean;
}
