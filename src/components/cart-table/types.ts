import { MouseEventHandler } from 'react';

import { TCart } from '~utils';

export interface ICartTableProps {
  data: TCart;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
