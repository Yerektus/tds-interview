import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import type { UsersTableProps } from "./users-table.types";
import { useNavigate } from "react-router";
import { paths } from "@/common/constants/paths";
import { ChevronRight } from "lucide-react";

export const UsersTable = ({ isLoading, table, columns }: UsersTableProps) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {!isLoading ? (
          table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(paths.getUserDetailPath(row.original.id));
                }}
                className="hover:bg-muted/80 cursor-pointer z-5"
                onClick={() => navigate(paths.getUserDetailPath(row.original.id))}
                aria-label={`Open profile of ${row.original.firstname} ${row.original.lastname}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
                <TableCell className="text-right">
                  <ChevronRight className="text-muted-foreground transition-opacity" size="16" aria-hidden="true" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-80 text-center">
                No results.
              </TableCell>
            </TableRow>
          )
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-80 text-center">
              Loading...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
