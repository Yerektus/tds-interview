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
import {
  ArrowUpDown,
  Pencil,
  Trash,
} from "lucide-react";

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

const createColumns = (
  handleDeleteButtonClick: (id: string) => void,
  navigateUserEdit: (userId: string) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    enableSorting: false,
    header: "ID",
    cell: ({ row }) => (
      <div className="font-mono lowercase">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Firstname
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("firstname")}</div>
    ),
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lastname
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("lastname")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
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
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Skills
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.skills.join(", ")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {formatDateTime(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => navigateUserEdit(row.original.id)}
          >
            <Pencil />
          </Button>
          <Button onClick={() => handleDeleteButtonClick(row.original.id)} variant="destructive" size="icon" className="rounded-full">
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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isAddUserModalOpen, setIsAddUserModalOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deleteUserId, setDeleteUserId] = React.useState("");

  const { data, refetch } = useGetUsersQuery();

  const handleAddUserButtonClick = () => {
    setIsAddUserModalOpen(true);
  };

  const handleAddUserButtonClose = (needRefresh?: boolean) => {
    setIsAddUserModalOpen(false);
    if (needRefresh) {
      console.log(true)
      refetch();
    }
  };

  const handleDeleteButtonClick = (id: string) => {
    setDeleteUserId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = (needRefresh?: boolean) => {
    setIsDeleteDialogOpen(false);
    setDeleteUserId("");
    if (needRefresh) {
      refetch();
    }
  };

  const columns = React.useMemo(
    () => createColumns(handleDeleteButtonClick, (userId: string) => navigate(paths.getUserDetailPath(userId))),
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    initialState: {
      sorting: [
        {
          id: "createdAt",
          desc: true,
        },
      ],
    },

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  console.log(data);

  return (
    <div className="w-full px-10">
      <div className="py-4">
        <UsersTableToolbar table={table} handleAddUserButtonClick={handleAddUserButtonClick} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <UsersTable table={table} columns={columns} />
      </div>
      <div className="py-4">
        <UsersTablePaginations table={table} />
      </div>
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={handleAddUserButtonClose}
      />
      <DeleteUserDialog 
        id={deleteUserId}
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
       />
    </div>
  );
}
