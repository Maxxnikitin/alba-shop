import { HTMLProps, MouseEventHandler } from 'react';

import { TCharacteristics } from '~utils';

export interface IItemCharacteristicsProps extends HTMLProps<HTMLDivElement> {
  characteristics: TCharacteristics[];
  currentCharacteristic: TCharacteristics;
  description: string[] | null;
  inFavourite: boolean;
  isNew: boolean;
  isHit: boolean;
  className?: string;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
}
