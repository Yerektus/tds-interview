import type { User } from "@/common/entities/user";
import type { Table } from "@tanstack/react-table";

export interface UsersTableToolbarProps {
    table: Table<User>;
    handleAddUserButtonClick: () => void;
}
