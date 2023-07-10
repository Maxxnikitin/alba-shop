import { TBrand, TCategory } from '~utils';

export interface IBrandItemProps {
  data: TBrand | TCategory;
  isCategory?: boolean;
  className?: string;
}
