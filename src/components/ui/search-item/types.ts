export interface ISearchItemProps {
  name: string;
  id: string | number;
  dataType: 'categories' | 'products' | 'rest';
  onCloseModal: () => void;
  icon?: string;
  slug?: string;
  isBold?: boolean;
  className?: string;
}
