import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import type { THandleSignInRequest, TInputsData } from '../../sign-in-sms/types';

export type TSmsInputProps = {
  inputsData: TInputsData;
  input0Ref: MutableRefObject<null>;
  handleRequest: THandleSignInRequest;
  setInputsData: Dispatch<SetStateAction<TInputsData>>;
  handleRemoveError: () => void;
  fieldClassName?: string;
  errorText?: string;
  isError?: boolean;
};
