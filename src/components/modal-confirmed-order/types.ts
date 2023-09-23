export interface IModalConfirmedOrderProps {
  isOpen: boolean;
  orderNum: number | null;
  onClose?: () => void;
  className?: string;
}
