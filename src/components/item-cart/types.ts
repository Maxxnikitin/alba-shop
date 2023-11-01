import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

import { TCart, TOrderContent } from '~utils';

export interface IItemCartProps {
  data: TOrderContent;
  setData: Dispatch<SetStateAction<TCart | null>>;
  handleRemoveItem: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
