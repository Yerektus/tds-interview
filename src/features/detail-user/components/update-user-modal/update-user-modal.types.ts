import type { User } from "@/common/entities/user";

export interface UpdateUserModalProps {
    user: User;
    isOpen: boolean;
    onClose: (needRefresh?: boolean) => void;
}
