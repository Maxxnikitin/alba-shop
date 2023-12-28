import { HTMLProps, MouseEventHandler } from 'react';

export interface IMenuPopupProps extends HTMLProps<HTMLDivElement> {
  onClose?: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
  handleCloseAllModals?: () => void;
  isBackBtn?: boolean;
  isOverlay?: boolean;
  overlayClassName?: string;
}
