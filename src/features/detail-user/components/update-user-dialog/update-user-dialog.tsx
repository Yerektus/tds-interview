import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/common/components/ui/alert-dialog";
import type { UpdateUserDialogProps } from "./update-user-dialog.types";

export const UpdateUserDialog = ({ onConfirm, isOpen, onClose }: UpdateUserDialogProps) => {

  const handleCloseDialog = () => {
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleCloseDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update User?</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to update this user?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
