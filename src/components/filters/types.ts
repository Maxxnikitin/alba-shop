import { TFilters, TSortingItems } from '~utils';

export interface IFiltersProps {
  filters: TFilters;
  currSort: TSortingItems;
  categoryId?: string;
  onClose?: () => void;
  isTitle?: boolean;
  isDesktop?: boolean;
  isFooter?: boolean;
  className?: string;
  totalItems?: number;
}
