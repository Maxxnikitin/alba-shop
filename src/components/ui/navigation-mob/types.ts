import { HTMLProps } from 'react';

export interface INavigationMobProps extends HTMLProps<HTMLElement> {
  handleOpenMenu: () => void;
  handleCloseAllModals: () => void;
  handleMobSearchOpen?: () => void;
}
