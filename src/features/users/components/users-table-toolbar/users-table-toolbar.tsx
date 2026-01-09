import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { ChevronDown, PlusCircle } from "lucide-react";
import type { UsersTableToolbarProps } from "./users-table-toolbar.types";

export const UsersTableToolbar = ({ table, handleAddUserButtonClick }: UsersTableToolbarProps) => {
  return (
    <div className="flex gap-3 items-center">
      <Input
        placeholder="Filter emails..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-full"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="default" onClick={handleAddUserButtonClick}>
        Add User
        <PlusCircle />
      </Button>
    </div>
  );
};
