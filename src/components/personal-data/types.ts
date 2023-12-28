export interface IPersonalDataProps {
  className?: string;
}

export type TStatusData = {
  linePercent: number;
  myStatus: {
    name: string;
    otherSum: number;
  };
};

export enum EMode {
  READ = 'read',
  EDIT = 'edit',
}
