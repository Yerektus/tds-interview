import type { UserDataDisplayProps } from "./user-data-display.types";

export const UserDataDisplay = ({ label, value }: UserDataDisplayProps) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium text-muted-foreground">{label}</span>
      <p className="text-foreground text-sm leading-relaxe">{value}</p>
    </div>
  );
};
