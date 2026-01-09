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

export const UserDetailView = () => {
    const { userId } = useParams<{ userId: string }>();
    const { data, refetch } = useGetUserByIdQuery(userId || "");

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
            <DetailUserBreadcrumbs user={data || ({} as User)} />
            <div className="mt-4">
                <Card className="max-w-xl w-full m-auto">
                    <CardHeader>
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <CardTitle>
                                    {data?.firstname} {data?.lastname}
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
                            <UserDataDisplay label="Email" value={data?.email || ""} />
                            <UserDataDisplay label="Skills" value={data?.skills.join(", ") || ""} />
                            <UserDataDisplay label="Created At" value={formatDateTime(data?.createdAt) || ""} />
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
