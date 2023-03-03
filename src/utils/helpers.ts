import { Dispatch, SetStateAction } from 'react';

export const handleToggleState = (setState: Dispatch<SetStateAction<boolean>>) => () => {
  setState(prev => !prev);
};
