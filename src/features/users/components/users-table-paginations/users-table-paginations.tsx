import { Button } from "@/common/components/ui/button";
import type { UserTablePaginationProps } from "./users-table-paginations.types";

export const UsersTablePaginations = ({ table }: UserTablePaginationProps) => {
  return (
    <div className="flex items-center justify-end">
      <div className="text-muted-foreground flex-1 text-sm">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
