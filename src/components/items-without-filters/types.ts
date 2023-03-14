import { TItemsWithPagination } from '~utils';

export interface IItemsWithoutFiltersProps {
  title: string;
  fetchFn: (query: string) => Promise<TItemsWithPagination>;
  additionalQuery?: string;
  className?: string;
}
