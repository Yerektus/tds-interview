type UserDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  createdAt: string;
};

export type UserCreateDto = Omit<UserDto, "id">;
export type UserUpdateDto = Omit<UserDto, "id">;
