export interface IContactItemProps {
  text: string;
  icon: EIcons;
  isPhone?: boolean;
  isEmail?: boolean;
  className?: string;
}

export enum EIcons {
  ADDRESS = 'address',
  TIME = 'time',
  PHONE = 'phone',
  EMAIL = 'email',
}
