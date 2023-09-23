import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

import { TCart } from '~utils';

export interface ICartTableProps {
  data: TCart;
  setData: Dispatch<SetStateAction<TCart | null>>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  handleRemoveCart: MouseEventHandler<HTMLButtonElement>;
  handleRemoveItem: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
