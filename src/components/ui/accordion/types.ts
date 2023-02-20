import { MouseEventHandler, HTMLProps } from 'react';

import { TGetFaqDataRes } from '~utils';

export interface IAccordionProps extends HTMLProps<HTMLDivElement> {
  dataObj: TGetFaqDataRes;
  isOpen: boolean;
  onBtnClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
