import { Dispatch, SetStateAction } from 'react';

export interface ITabsProps {
  activeTab: ETypes;
  setActiveTab: Dispatch<SetStateAction<ETypes>>;
  className?: string;
}

export enum ETypes {
  phone = 'phone',
  email = 'email',
}
