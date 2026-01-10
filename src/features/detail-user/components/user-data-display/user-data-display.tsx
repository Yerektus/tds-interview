import { Skeleton } from "@/common/components/ui/skeleton";
import type { UserDataDisplayProps } from "./user-data-display.types";
import { Badge } from "@/common/components/ui/badge";

export const UserDataDisplay = ({ isLoading, label, value }: UserDataDisplayProps) => {
  const skills = value.split(", ");

  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-muted-foreground">{label}</span>
      {isLoading ? (
        <Skeleton className="h-4 w-[250px]" />
      ) : (
        <>
          {skills.length > 1 ? (
            <div className="flex flex-wrap gap-2 whitespace-pre-line">
              {skills.map((s) => (
                <Badge variant={"outline"}>{s}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-foreground text-sm leading-relaxe">{value}</p>
          )}
        </>
      )}
    </div>
  );
};
