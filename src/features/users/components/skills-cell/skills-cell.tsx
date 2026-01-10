import { Badge } from "@/common/components/ui/badge";
import type { SkillsCellProps } from "./skills-cell.types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";

export const SkillsCell = ({ skills, maxVisible = 2 }: SkillsCellProps) => {
  const visible = skills.slice(0, maxVisible);
  const hidden = skills.slice(maxVisible);
  const hiddenCount = hidden.length;

  if (skills.length === 0) {
    return <span className="text-muted-foreground">—</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visible.map((s) => (
        <Badge key={s} variant={"outline"} className="whitespace-nowrap">
          {s}
        </Badge>
      ))}

      {hiddenCount > 0 && (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant={"outline"} className="whitespace-nowrap text-muted-foreground">
                +{hiddenCount}
              </Badge>
            </TooltipTrigger>

            <TooltipContent className="max-w-[320px] flex flex-col gap-1">
              <div className="text-sm">more skills</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {hidden.map((s) => (
                  <Badge key={s} variant={"secondary"}>
                    {s}
                  </Badge>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
