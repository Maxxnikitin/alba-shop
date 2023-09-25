import { Dispatch, HTMLProps, MouseEventHandler, SetStateAction } from 'react';

export interface ICartButtonProps extends HTMLProps<HTMLDivElement> {
  max: number;
  handleAddToCart: MouseEventHandler<HTMLButtonElement>;
  handleUpdateInCart: (val: number) => void;
  handleDeleteFromCart: () => void;
  isSmall?: boolean;
  amount?: number;
  isFetchError?: boolean;
  setIsFetchError?: Dispatch<SetStateAction<boolean>>;
}
