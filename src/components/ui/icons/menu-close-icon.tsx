import { TIconProps } from './utils';

export const MenuCloseIcon = ({ className = '' }: TIconProps) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='19'
    viewBox='0 0 18 19'
    fill='none'
  >
    <path d='M15 15L3 3M15 3L3 15' stroke='white' strokeWidth='2' strokeLinecap='round' />
  </svg>
);
