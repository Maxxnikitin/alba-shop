import { DebouncedFunc } from 'lodash';
import { ChangeEventHandler } from 'react';

import { ERequestStatus, TLiveSearchRes } from '~utils';

export interface IModalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: DebouncedFunc<ChangeEventHandler<HTMLInputElement>>;
  data: TLiveSearchRes | null;
  searchStatus: ERequestStatus;
  searchReqString: string;
  className?: string;
}
