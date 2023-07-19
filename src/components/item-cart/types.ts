import { MouseEventHandler } from 'react';

import { TOrderContent } from '~utils';

export interface IItemCartProps {
  data: TOrderContent;
  handleRemoveItem: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
