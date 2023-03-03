import { MouseEventHandler } from 'react';

import { TCharacteristics, TGetProductRes } from '~utils';

export interface IItemGalleryProps {
  currentCharacteristic: TCharacteristics;
  dataObj: TGetProductRes;
  className?: string;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
}
