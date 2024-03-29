import { TIconProps } from './utils';

export const MenuIcon = ({ className = '' }: TIconProps) => (
  <svg
    width='18'
    height='15'
    viewBox='0 0 18 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <rect y='0.5' width='18' height='2' fill='white' />
    <rect y='6.5' width='18' height='2' fill='white' />
    <rect y='12.5' width='18' height='2' fill='white' />
  </svg>
);
