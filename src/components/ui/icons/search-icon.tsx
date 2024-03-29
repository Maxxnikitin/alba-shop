import { TIconProps } from './utils';

export const SearchIcon = ({ className = '' }: TIconProps) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M24.76 23.64L17.24 16.12C18.5733 14.52 19.4 12.4667 19.4 10.2C19.4 5.13333 15.2667 1 10.2 1C5.13333 1 1 5.13333 1 10.2C1 15.2667 5.13333 19.4 10.2 19.4C12.44 19.4 14.52 18.6 16.12 17.24L23.64 24.76C23.96 25.08 24.4667 25.08 24.76 24.76C25.08 24.44 25.08 23.96 24.76 23.64ZM10.2 17.8C6.01333 17.8 2.6 14.3867 2.6 10.2C2.6 6.01333 6.01333 2.6 10.2 2.6C14.3867 2.6 17.8 6.01333 17.8 10.2C17.8 14.3867 14.3867 17.8 10.2 17.8Z'
      fill='#292929'
      stroke='#292929'
      strokeWidth='1.4'
    />
  </svg>
);
