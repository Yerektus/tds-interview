export interface UpdateUserDialogProps {
    onConfirm: () => void;
    isOpen: boolean;
    onClose: (needRefresh?: boolean) => void;
}