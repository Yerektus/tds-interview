import { UserDetailView } from "@/features/detail-user/views/user-detail-view";
import { ListUsersView } from "@/features/users/views/list-users-view";
import { createBrowserRouter, type RouteObject } from "react-router";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <ListUsersView />,
    },
    {
        path: "/users/:userId",
        element: <UserDetailView />,
    },
    {
        path: "/*",
        element: <ListUsersView />,
    },
];

export const router = createBrowserRouter(routes);
