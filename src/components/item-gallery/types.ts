import { MouseEventHandler } from 'react';

export interface IItemGalleryProps {
  photos: string[];
  inFavourite: boolean;
  isNew: boolean;
  isHit: boolean;
  className?: string;
  onLikeClick: MouseEventHandler<HTMLButtonElement>;
}
