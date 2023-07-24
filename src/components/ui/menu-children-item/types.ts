import { HTMLProps } from 'react';

import { TCategoryChildren } from '~utils';

export interface IMenuChildrenItemProps extends HTMLProps<HTMLDivElement> {
  dataObj: TCategoryChildren;
  prefixUrl: string;
  handleCloseAllModals: () => void;
}
