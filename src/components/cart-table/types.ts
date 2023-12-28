import { MouseEventHandler } from 'react';

export interface ICartTableProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  handleRemoveCart: MouseEventHandler<HTMLButtonElement>;
  handleRemoveItem: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
