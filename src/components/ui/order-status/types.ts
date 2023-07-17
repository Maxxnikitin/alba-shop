export interface IOrderStatusProps {
  type: EOrderStatus;
  className?: string;
}

export enum EOrderStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  SENT = 'SENT',
  CANCELED = 'CANCELED',
  RECEIVED = 'RECEIVED',
}
