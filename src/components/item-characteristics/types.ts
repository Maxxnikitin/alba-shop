import { HTMLProps, MouseEventHandler } from 'react';

import { TCharacteristic, TGetProductRes } from '~utils';

export interface IItemCharacteristicsProps extends HTMLProps<HTMLDivElement> {
  characteristics: TCharacteristic[];
  currentCharacteristic: TCharacteristic;
  dataObj: TGetProductRes;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
}
