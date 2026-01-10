import * as React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";

import { Button } from "@/common/components/ui/button";
import type { User } from "@/common/entities/user";
import { UsersTable } from "../components/users-table/users-table";
import { useGetUsersQuery } from "@/common/api/users-api";
import { formatDateTime } from "@/common/utils/date-time-formatter";
import { useNavigate } from "react-router";
import { AddUserModal } from "../components/add-user/add-user-modal";
import { DeleteUserDialog } from "../components/delete-user-dialog/delete-user-dialog";
import { UsersTableToolbar } from "../components/users-table-toolbar/users-table-toolbar";
import { UsersTablePaginations } from "../components/users-table-paginations/users-table-paginations";
import { paths } from "@/common/constants/paths";
import { DetailUserBreadcrumbs } from "../components/users-table-breadcrumbs/users-table-breadcrumbs";
import { SkillsCell } from "../components/skills-cell/skills-cell";

const createColumns = (handleDeleteButtonClick: (user: User) => void): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    enableSorting: false,
    header: "ID",
    cell: ({ row }) => <div className="font-mono underline underline-offset-2 lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Firstname
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("firstname")}</div>,
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Lastname
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("lastname")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "skills",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Skills
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <SkillsCell skills={row.original.skills} maxVisible={2} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Created At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{formatDateTime(row.getValue("createdAt"))}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="z-10">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteButtonClick(row.original);
            }}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export function ListUsersView() {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isAddUserModalOpen, setIsAddUserModalOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deleteUser, setDeleteUser] = React.useState({} as User);

  const { data, isLoading, refetch } = useGetUsersQuery();

  const handleAddUserButtonClick = () => {
    setIsAddUserModalOpen(true);
  };

  const handleAddUserButtonClose = (needRefresh?: boolean) => {
    setIsAddUserModalOpen(false);
    if (needRefresh) {
      console.log(true);
      refetch();
    }
  };

  const handleDeleteButtonClick = (user: User) => {
    setDeleteUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = (needRefresh?: boolean) => {
    setIsDeleteDialogOpen(false);
    setDeleteUser({} as User);
    if (needRefresh) {
      refetch();
    }
  };

  const onDeleteButtonClick = React.useCallback(
    (user: User) => {
      handleDeleteButtonClick(user);
    },
    [handleDeleteButtonClick],
  );

  const onOpenDetailUser = React.useCallback(
    (userId: string) => {
      navigate(paths.getUserDetailPath(userId));
    },
    [navigate],
  );

  const tableData = React.useMemo(() => data ?? [], [data]);

  const columns = React.useMemo(() => createColumns(onDeleteButtonClick), [onDeleteButtonClick, onOpenDetailUser]);

  const table = useReactTable({
    data: tableData,
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <DetailUserBreadcrumbs />
      <div className="w-full px-10">
        <div className="py-4">
          <UsersTableToolbar table={table} handleAddUserButtonClick={handleAddUserButtonClick} />
        </div>
        <div className="overflow-hidden rounded-md border">
          <UsersTable isLoading={isLoading} table={table} columns={columns} />
        </div>
        <div className="py-4">
          <UsersTablePaginations table={table} />
        </div>
        <AddUserModal isOpen={isAddUserModalOpen} onClose={handleAddUserButtonClose} />
        <DeleteUserDialog user={deleteUser} isOpen={isDeleteDialogOpen} onClose={handleDeleteDialogClose} />
      </div>
    </div>
  );
}
