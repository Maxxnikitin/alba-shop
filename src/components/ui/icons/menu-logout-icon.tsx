import { TIconProps } from './utils';

export const MenuLogoutIcon = ({ className = '' }: TIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='30'
    height='31'
    viewBox='0 0 30 31'
    fill='none'
    className={className}
  >
    <path
      d='M23 4.75926L23 3C23 1.89543 22.1046 1 21 1H3C1.89543 1 1 1.89543 1 3V28C1 29.1046 1.89543 30 3 30H21C22.1046 30 23 29.1046 23 28L23 25.1667'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M29.7071 15.7071C30.0976 15.3166 30.0976 14.6834 29.7071 14.2929L23.3431 7.92893C22.9526 7.53841 22.3195 7.53841 21.9289 7.92893C21.5384 8.31946 21.5384 8.95262 21.9289 9.34315L27.5858 15L21.9289 20.6569C21.5384 21.0474 21.5384 21.6805 21.9289 22.0711C22.3195 22.4616 22.9526 22.4616 23.3431 22.0711L29.7071 15.7071ZM19.9138 15V14V15ZM10.5 16H19.9138V14H10.5L10.5 16ZM19.9138 16H29V14H19.9138V16Z'
      fill='black'
    />
  </svg>
);
