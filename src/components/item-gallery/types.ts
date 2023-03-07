import { MouseEventHandler } from 'react';

import { TCharacteristic, TGetProductRes } from '~utils';

export interface IItemGalleryProps {
  currentCharacteristic: TCharacteristic;
  dataObj: TGetProductRes;
  className?: string;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
}
