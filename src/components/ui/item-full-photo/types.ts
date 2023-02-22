import { MouseEventHandler } from 'react';

export interface IItemFullPhotoProps {
  photo: string;
  inFavourite: boolean;
  isHit: boolean;
  isNew: boolean;
  className?: string;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
}
