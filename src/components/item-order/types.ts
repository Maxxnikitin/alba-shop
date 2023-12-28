import { MouseEventHandler } from 'react';

import { TOrder } from '~utils';

export interface IItemOrderProps {
  data: TOrder;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
