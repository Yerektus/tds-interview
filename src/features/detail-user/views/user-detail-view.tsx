import { useGetUserByIdQuery } from "@/common/api/users-api";
import { Button } from "@/common/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/ui/card";
import type { User } from "@/common/entities/user";
import { formatDateTime } from "@/common/utils/date-time-formatter";
import { DetailUserBreadcrumbs } from "@/features/detail-user/components/detail-user-breadcrumbs/detail-user-breadcrumbs";
import { UpdateUserModal } from "@/features/detail-user/components/update-user-modal/update-user-modal";
import { UserDataDisplay } from "@/features/detail-user/components/user-data-display/user-data-display";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { Skeleton } from "@/common/components/ui/skeleton";

export const UserDetailView = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading, refetch } = useGetUserByIdQuery(userId || "");

  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  const handleUpdateUserButtonClick = () => {
    setIsUpdateUserModalOpen(true);
  };

  const handleUpdateUserButtonClose = (needRefresh?: boolean) => {
    setIsUpdateUserModalOpen(false);
    if (needRefresh) {
      refetch();
    }
  };

  return (
    <div>
      <DetailUserBreadcrumbs isLoading={isLoading} user={data || ({} as User)} />
      <div className="mt-4">
        <Card className="max-w-xl w-full m-auto">
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>
                  {isLoading ? (
                    <Skeleton className="h-4 w-[200px]" />
                  ) : (
                    <>
                      {data?.firstname} {data?.lastname}
                    </>
                  )}
                </CardTitle>
                <CardDescription>User information</CardDescription>
              </div>
              <Button variant="outline" size={"icon"} onClick={handleUpdateUserButtonClick}>
                <Pencil />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <UserDataDisplay isLoading={isLoading} label="Email" value={data?.email || ""} />
              <UserDataDisplay isLoading={isLoading} label="Skills" value={data?.skills.join(", ") || ""} />
              <UserDataDisplay isLoading={isLoading} label="Created At" value={formatDateTime(data?.createdAt) || ""} />
            </div>
          </CardContent>
        </Card>
      </div>
      <UpdateUserModal
        user={data || ({} as User)}
        isOpen={isUpdateUserModalOpen}
        onClose={handleUpdateUserButtonClose}
      />
    </div>
  );
};
