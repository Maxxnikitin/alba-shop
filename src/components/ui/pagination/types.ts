import { TItemsWithPagination, TParams } from '~utils';

export interface IPaginationProps {
  amountPages: number;
  onClick: (obj: TParams) => void;
  onBtnLoadClick: (obj: TParams) => void;
  callback?: (queries: string[], q?: string) => Promise<TItemsWithPagination>;
  currSort?: string;
  categoryId?: string;
  q?: string;
  additionalQuery?: string;
  className?: string;
}
