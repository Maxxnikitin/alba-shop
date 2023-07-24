import { TFilters } from '~utils';

export interface IFiltersProps {
  filters: TFilters;
  onClose?: () => void;
  isTitle?: boolean;
  isFooter?: boolean;
  className?: string;
}
