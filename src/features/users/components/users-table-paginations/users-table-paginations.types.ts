import type { User } from "@/common/entities/user";
import type { Table } from "@tanstack/react-table";

export interface UserTablePaginationProps {
    table: Table<User>;
}
