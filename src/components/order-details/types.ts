import { Dispatch, SetStateAction } from 'react';

import { TOrder } from '~utils';

export interface IOrderDetailsProps {
  data: TOrder;
  setIsUpdateData: Dispatch<SetStateAction<boolean>>;
  className?: string;
}
