import { Dispatch, SetStateAction } from 'react';

export const handleToggleList = (setState: Dispatch<SetStateAction<boolean>>) => () => {
  setState(prev => !prev);
};
