import { Skeleton } from "@/common/components/ui/skeleton";
import type { UserDataDisplayProps } from "./user-data-display.types";

export const UserDataDisplay = ({ isLoading, label, value }: UserDataDisplayProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-muted-foreground">{label}</span>
      {isLoading ? (
        <Skeleton className="h-4 w-[250px]" />
      ) : (
        <p className="text-foreground text-sm leading-relaxe">{value}</p>
      )}
    </div>
  );
};
