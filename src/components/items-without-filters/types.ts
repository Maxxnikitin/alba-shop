import { TItemsWithPagination } from '~utils';

export interface IItemsWithoutFiltersProps {
  title: string;
  fetchFn: (query: string) => Promise<TItemsWithPagination>;
  className?: string;
}
