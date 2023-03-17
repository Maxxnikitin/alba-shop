export interface IDiscountItemProps {
  amount: EDiscounts;
  className?: string;
}

export enum EDiscounts {
  FIFTEEN = 15,
  TWENTY_FIVE = 25,
  FORTY = 40,
}
