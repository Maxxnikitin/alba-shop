import { ChangeEventHandler, MouseEventHandler } from 'react';

import { TConfirmOrderData } from '~utils';

export interface ICartConfirmProps {
  price: number;
  data: TConfirmOrderData;
  handleChangeInputs: ChangeEventHandler<HTMLInputElement>;
  handleChangePhone: (v: string | undefined) => void;
  handleBackClick: MouseEventHandler<HTMLButtonElement>;
  handleCreateOrder: MouseEventHandler<HTMLButtonElement>;
  isPhoneError: boolean;
  isEmailError: boolean;
  className?: string;
}
