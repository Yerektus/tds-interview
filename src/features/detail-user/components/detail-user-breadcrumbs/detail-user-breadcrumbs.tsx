import { useNavigate } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb";
import { paths } from "@/common/constants/paths";

import type { DetailUserBreadcrumbsProps } from "./detail-user-breadcrumbs.types";
import { Skeleton } from "@/common/components/ui/skeleton";

export const DetailUserBreadcrumbs = ({ isLoading, user }: DetailUserBreadcrumbsProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border-b">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate(paths.getHomePath())}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isLoading ? (
                <Skeleton className="h-4 w-[150px]" />
              ) : (
                <>
                  {user?.firstname} {user?.lastname}
                </>
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
