import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserResponse } from "./responses/user.reponse";
import type { UserCreateDto } from "./requests/user.request";
import { mapUserResponseToUser } from "./mappers/user.mapper";
import type { User } from "../entities/user";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Users", "User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      transformResponse: (response: UserResponse[]) => response.map((userResponse: UserResponse) => mapUserResponseToUser(userResponse)),
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: UserResponse) => mapUserResponseToUser(response),
      providesTags: (_result, _err, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation<User, UserCreateDto>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      transformResponse: (response: UserResponse) => mapUserResponseToUser(response),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation<User, { id: number; body: Partial<UserCreateDto> }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: UserResponse) => mapUserResponseToUser(response),
      invalidatesTags: (_result, _err, { id }) => [{ type: "User", id }, { type: "Users", id: "LIST" }],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;