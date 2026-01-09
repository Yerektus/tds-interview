import { useDeleteUserMutation } from "@/common/api/users-api";
import type { DeleteUserDialogProps } from "./delete-user-dialog.types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/common/components/ui/alert-dialog";
import { toast } from "sonner";


export const DeleteUserDialog = ({
  id,
  isOpen,
  onClose,
}: DeleteUserDialogProps) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteDialogConfirm = async () => {
      const response = await deleteUser(id);

      if (!response.data) {
        toast.error("Failed to delete user.");
        return
      }

      toast.success("User deleted successfully.");
      onClose(true);
  }

  const handleCloseDialog = () => {
    onClose()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleCloseDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this user?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteDialogConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
