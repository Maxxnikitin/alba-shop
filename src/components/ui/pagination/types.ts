import { Dispatch, SetStateAction } from 'react';

export interface IPaginationProps {
  amountPage: number;
  activePage: number;
  setCurrPaginationPage: Dispatch<SetStateAction<number>>;
  className?: string;
}
