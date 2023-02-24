import { HTMLProps, MouseEventHandler } from 'react';

import { TCharacteristics, TGetProductRes } from '~utils';

export interface IItemCharacteristicsProps extends HTMLProps<HTMLDivElement> {
  characteristics: TCharacteristics[];
  currentCharacteristic: TCharacteristics;
  dataObj: TGetProductRes;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
}
