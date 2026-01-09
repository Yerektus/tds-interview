export interface DeleteUserDialogProps {
  id: string;
  isOpen: boolean;
  onClose: (needRefresh?: boolean) => void;
}
