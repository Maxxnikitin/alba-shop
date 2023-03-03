import { Dispatch, SetStateAction } from 'react';

import { THandleSignInRequest, TInputsData } from '../../sign-in-sms';

export type TSmsInputProps = {
  inputsData: TInputsData;
  handleRequest: THandleSignInRequest;
  setInputsData: Dispatch<SetStateAction<TInputsData>>;
  fieldClassName?: string;
  errorText?: string;
};
