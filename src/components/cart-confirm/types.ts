import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'react';

import { TConfirmOrderData } from '~utils';

export interface ICartConfirmProps {
  price: number;
  data: TConfirmOrderData;
  handleChangeInputs: ChangeEventHandler<HTMLInputElement>;
  handleChangePhone: (v: string | undefined) => void;
  handleBackClick: MouseEventHandler<HTMLButtonElement>;
  handleCreateOrder: FormEventHandler<HTMLFormElement>;
  isPhoneError: boolean;
  isEmailError: boolean;
  isRequestError?: boolean;
  className?: string;
}
