import { HTMLProps } from 'react';

export interface INavigationProps extends HTMLProps<HTMLElement> {
  handleMobSearchOpen?: () => void;
}
