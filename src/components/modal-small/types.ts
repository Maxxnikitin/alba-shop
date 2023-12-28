import { MouseEventHandler } from 'react';

export interface IModalSmallProps {
  isOpen: boolean;
  title: string;
  text?: string;
  successBtnText?: string;
  cancellBtnText?: string;
  onSuccess?: MouseEventHandler<HTMLButtonElement>;
  onClose?: () => void;
  withCloseBtn?: boolean;
  className?: string;
  isBtnDisabled?: boolean;
}
