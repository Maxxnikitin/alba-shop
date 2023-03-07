export interface ICostBoxProps {
  price: string;
  discount: number;
  discountedPrice: string;
  size?: 'large' | 'small';
  className?: string;
}
