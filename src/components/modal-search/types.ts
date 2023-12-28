import { ChangeEventHandler, FormEventHandler } from 'react';

import { ERequestStatus, TLiveSearchRes } from '~utils';

export interface IModalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onRemoveValue: () => void;
  onFormSubmit?: FormEventHandler<HTMLFormElement>;
  data: TLiveSearchRes | null;
  searchStatus: ERequestStatus;
  inputValue: string;
  className?: string;
}
