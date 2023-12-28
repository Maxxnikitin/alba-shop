import { ChangeEventHandler } from 'react';

import { TSortingItems } from '~utils';

export interface ISortSelectProps {
  value: TSortingItems;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}
