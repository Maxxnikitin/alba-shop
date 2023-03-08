import { MouseEventHandler } from 'react';

import { TCharacteristic } from '~utils';

export interface IItemProps {
  data: TCharacteristic;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
