import type { User } from "@/common/entities/user";

export type UserCreateDto = Omit<User, "id">
export type UserUpdateDto = Omit<User, "id">