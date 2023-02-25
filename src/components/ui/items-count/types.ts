import { ChangeEventHandler, HTMLProps, MouseEventHandler } from 'react';

export interface IItemsCountProps extends HTMLProps<HTMLDivElement> {
  max: number;
  handleBtnsClick: MouseEventHandler<HTMLButtonElement>;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  amount?: number;
}
