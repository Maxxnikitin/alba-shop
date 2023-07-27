import { DebouncedFunc } from 'lodash';
import { ChangeEventHandler } from 'react';

import { TLiveSearchRes } from '~utils';

export interface IModalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: DebouncedFunc<ChangeEventHandler<HTMLInputElement>>;
  data: TLiveSearchRes | null;
  className?: string;
}
