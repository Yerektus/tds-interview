import type { User } from "@/common/entities/user";
import type { ColumnDef, Table } from "@tanstack/react-table";

export interface UsersTableProps {
  table: Table<User>;
  columns: ColumnDef<User>[];
}
