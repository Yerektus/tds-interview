import axios from "axios";
import type { UserResponse } from "../responses/user.reponse";
import { mapUserResponseToUser } from "../mappers/user.mapper";
import type { User } from "@/common/entities/user";

export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get<{
    users: UserResponse[]
  }>(
    "https://dummyjson.com/users"
  );

  return response.data.users.map((userResponse) => mapUserResponseToUser(userResponse));
}