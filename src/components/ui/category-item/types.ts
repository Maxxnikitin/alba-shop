export interface ICategoryItemProps {
  text: string;
  className?: string;
  icon?: EIconType;
}

export enum EIconType {
  cableIcon = 'cableIcon',
  carIcon = 'carIcon',
  caseIcon = 'caseIcon',
  chargingIcon = 'chargingIcon',
  childIcon = 'childIcon',
  gadgetIcon = 'gadgetIcon',
  glassIcon = 'glassIcon',
  headphoneIcon = 'headphoneIcon',
  strapIcon = 'strapIcon',
}
